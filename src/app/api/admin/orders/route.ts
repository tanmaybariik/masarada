export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Support guest checkout, or attach to logged in user if available
    const session = await auth();
    const userId = session?.user?.id || null;

    const order = await prisma.order.create({
      data: {
        userId: userId,
        date: data.date,
        subtotal: data.subtotal,
        discount: data.discount,
        couponDiscount: data.couponDiscount || 0,
        shipping: data.shipping || 0,
        total: data.total,
        paymentMethod: data.paymentMethod,
        status: data.status || "processing",
        statusText: data.statusText || "অর্ডার প্রসেস হচ্ছে (Processing)",
        trackingNumber: data.trackingNumber || `ORD-${Date.now()}`,
        
        customerName: data.customer.name,
        customerPhone: data.customer.phone,
        customerAddress: data.customer.address,
        customerCity: data.customer.city,
        customerPincode: data.customer.pincode,
        customerEmail: data.customer.email,

        items: {
          create: data.items.map((item: any) => ({
            productId: item.product.id,
            quantity: item.quantity,
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as any;
    if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN" && user.email !== "arnab@masarada.com")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const order = await prisma.order.update({
      where: { id: data.id },
      data: {
        status: data.status,
        statusText: data.statusText,
        trackingNumber: data.trackingNumber,
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
