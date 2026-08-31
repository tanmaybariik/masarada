@echo off
echo ==============================================
echo [ Karunamoyee Ma Sarada - Auto Git Push ]
echo ==============================================
git add .
git commit -m "update: automated deployment %date% %time%"
git push origin main
echo ==============================================
echo [ Successfully Pushed to GitHub and Vercel! ]
echo ==============================================
pause
