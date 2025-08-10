# Environment Variables Setup Guide for Vercel Deployment

## Backend Environment Variables (Add in Vercel Dashboard)

### Database

- `MONGO` = `mongodb+srv://username:password@cluster.mongodb.net/database-name`
  - Your MongoDB Atlas connection string
  - Make sure to whitelist Vercel IPs: 0.0.0.0/0 in MongoDB Atlas Network Access

### Frontend URL

- `CLIENT_URL` = `https://your-frontend-domain.vercel.app`
  - Will be your deployed frontend URL
  - Update this after frontend deployment

### ImageKit Configuration

- `IMAGEKIT_PUBLIC_KEY` = `your_imagekit_public_key`
- `IMAGEKIT_PRIVATE_KEY` = `your_imagekit_private_key`
- `IMAGEKIT_URL_ENDPOINT` = `https://ik.imagekit.io/your_imagekit_id`

### Clerk Authentication (Backend)

- `CLERK_SECRET_KEY` = `sk_live_...` (or `sk_test_...` for development)
- `CLERK_WEBHOOK_SECRET` = `whsec_...` (if using webhooks)

### Optional

- `PORT` = `3000` (Vercel will override this automatically)
- `NODE_ENV` = `production` (set automatically by Vercel)

---

## Frontend Environment Variables (Add in Vercel Dashboard)

### API Configuration

- `VITE_API_URL` = `https://your-backend-domain.vercel.app`
  - Will be your deployed backend URL
  - Update this after backend deployment

### ImageKit Configuration

- `VITE_IMAGE_KIT_ENDPOINT` = `https://ik.imagekit.io/your_imagekit_id`
  - Same as backend IMAGEKIT_URL_ENDPOINT

### Clerk Authentication (Frontend)

- `VITE_CLERK_PUBLISHABLE_KEY` = `pk_live_...` (or `pk_test_...` for development)

---

## How to Add Environment Variables in Vercel:

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable:
   - Name: Variable name (e.g., `MONGO`)
   - Value: Variable value (e.g., your MongoDB connection string)
   - Environment: Select "Production", "Preview", and "Development" as needed
5. Click "Save"

---

## Important Notes:

### MongoDB Atlas Setup:

- Whitelist all IPs (0.0.0.0/0) in Network Access
- Or add Vercel's IP ranges (check Vercel docs for current ranges)

### Clerk Setup:

- Make sure your Clerk app is configured for production
- Add your Vercel domains to Clerk's allowed origins
- Frontend domain: `https://your-frontend.vercel.app`
- Backend domain: `https://your-backend.vercel.app`

### ImageKit Setup:

- Ensure your ImageKit account allows requests from your Vercel domains
- Configure CORS settings if necessary

### Deployment Order:

1. Deploy backend first to get the API URL
2. Update VITE_API_URL in frontend environment variables
3. Deploy frontend to get the frontend URL
4. Update CLIENT_URL in backend environment variables
5. Redeploy backend with updated CLIENT_URL

---

## Local Development vs Production:

### Local (.env files):

```bash
# Backend .env
MONGO=mongodb://localhost:27017/cypherai
CLIENT_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
CLERK_SECRET_KEY=sk_test_...

# Frontend .env
VITE_API_URL=http://localhost:3000
VITE_IMAGE_KIT_ENDPOINT=https://ik.imagekit.io/your_id
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### Production (Vercel Dashboard):

Use the live/production keys and your deployed URLs as shown above.
