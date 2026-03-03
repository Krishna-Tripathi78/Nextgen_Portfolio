# Contact Form Setup Instructions

## ✅ What's Already Done

- Contact form UI is complete
- Server action is implemented
- Sanity schema for contact submissions is ready
- Form validation is in place

## 🔑 Get Your Sanity API Write Token

### Step 1: Go to Sanity Management

1. Visit: https://www.sanity.io/manage
2. Select your project: **vztm2m1w**

### Step 2: Create API Token

1. Click on **API** in the left sidebar
2. Click **Add API Token**
3. Give it a name: `Contact Form Write Token`
4. Set permissions to: **Editor** (or **Write**)
5. Click **Add Token**
6. **COPY THE TOKEN** (you won't see it again!)

### Step 3: Add Token to .env.local

1. Open `.env.local` file
2. Replace the empty `SANITY_API_WRITE_TOKEN=` with your token:
   ```
   SANITY_API_WRITE_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

### Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
# or
pnpm dev
```

## 🧪 Test the Contact Form

1. Go to your website: http://localhost:3000
2. Scroll to the **Get In Touch** section
3. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message
4. Click **Send Message**
5. You should see: "Thank you! Your message has been sent successfully."

## 📊 View Submissions in Sanity Studio

1. Go to: http://localhost:3000/studio
2. Look for **Contact Form Submissions** in the sidebar
3. You should see your test submission there!

## ⚠️ Troubleshooting

### Error: "Server configuration error"

- Make sure you added the `SANITY_API_WRITE_TOKEN` to `.env.local`
- Restart your dev server

### Error: "Failed to submit the form"

- Check the browser console for detailed errors
- Verify your Sanity token has write permissions
- Make sure your dataset is set to `develop` (not `production`)

### Form submits but nothing appears in Sanity

- Check if the token has the correct permissions
- Verify the dataset name matches in both `.env.local` and Sanity dashboard

## 🎉 That's It!

Your contact form is now fully functional and will save all submissions to your Sanity CMS!
