# Google OAuth Setup Guide

## 🔧 Quick Setup Instructions

### 1. **Get Google OAuth Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API** or **Google Identity Services**
4. Navigate to **"Credentials"** → **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. Choose **"Web application"** as application type
6. Add authorized origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)

### 2. **Environment Configuration**
Create or update your `.env.local` file:

\`\`\`bash
# Replace with your actual Google Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
\`\`\`

### 3. **Verification**
- ✅ Client ID should be ~72 characters long
- ✅ Should end with `.apps.googleusercontent.com`
- ✅ Should start with numbers
- ✅ No quotes or extra spaces

### 4. **Demo Mode**
If Google OAuth is not configured:
- Google Sign-In buttons will be disabled
- Users will see a helpful notice
- Email authentication still works perfectly
- No errors or crashes

## 🚨 Common Issues

### "Client ID not found" Error
- **Cause**: Invalid or missing `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- **Solution**: Double-check your Client ID in Google Cloud Console

### Button Not Working
- **Cause**: Domain not in authorized origins
- **Solution**: Add your domain to Google OAuth settings

### Script Loading Issues
- **Cause**: Network or CORS issues
- **Solution**: Check browser console for specific errors

## 🎯 Testing
1. **Without Config**: Should show disabled button with notice
2. **With Config**: Should show working Google Sign-In
3. **Email Fallback**: Always works regardless of Google setup

## 📞 Support
If you need help setting up Google OAuth:
- 📧 Email: auxinbiotek1986@gmail.com
- 📞 Phone: +91 8542986911
