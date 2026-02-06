# Sanity CMS Guide - Managing Properties

This guide explains how to use Sanity CMS to manage properties on your website.

## Overview

Your website now uses **Sanity CMS** to manage all property data. This means you can:
- ✅ Add new properties through a visual admin dashboard
- ✅ Edit existing properties
- ✅ Upload and manage images
- ✅ Mark properties as sold (remove them)
- ✅ Feature properties on the homepage
- ✅ No coding required!

---

## Getting Started

### 1. Access Sanity Studio

**Local Development:**
```bash
npm run studio:dev
```

This will start Sanity Studio at: **http://localhost:3333**

**Online (After deploying Studio):**
- Visit: `https://your-project-name.sanity.studio`
- Or manage at: https://sanity.io/manage

### 2. First Time Setup

When you first open Sanity Studio:
1. You'll be asked to log in with your Sanity account
2. Once logged in, you'll see the Studio dashboard

---

## Managing Properties

### Adding a New Property

1. **Open Sanity Studio** (`npm run studio:dev`)
2. Click **"Property"** in the left sidebar
3. Click **"+ Create"** button
4. Fill in all the fields:

#### Required Fields:

**Basic Information:**
- **Property Title** - e.g., "Luxury 3BR Villa in Palm Jumeirah"
- **Price (AED)** - Enter the price in AED (e.g., 5500000)
- **Location** - Main area (e.g., "Palm Jumeirah")
- **Neighborhood** - Specific area (e.g., "Frond M")
- **Property Type** - Select: Villa, Apartment, Penthouse, or Townhouse

**Property Details:**
- **Bedrooms** - Number of bedrooms
- **Bathrooms** - Number of bathrooms
- **Area (sq ft)** - Total area in square feet

**Images:**
- **Main Image** - Upload the primary image (shown in listings)
- **Gallery Images** - Upload 5-10 additional images for the property gallery
  - Click "Upload" to select images
  - Drag to reorder images

**Description:**
- Write a detailed description (minimum 50 characters)
- Highlight key features and selling points

**Property Status:**
- **Featured Property** - Toggle ON to show on homepage
- **New Listing** - Toggle ON to show "NEW" badge

#### Optional Fields:

**Amenities:**
- Click "+ Add item" to add amenities
- Examples: Swimming Pool, Gym, Parking, 24/7 Security, etc.

**Nearby Facilities:**
- Click "+ Add item" to add facilities
- For each facility, enter:
  - **Facility Name** (e.g., "Mall of the Emirates")
  - **Distance** (e.g., "5 min drive")
  - **Type** (School, Hospital, Mall, etc.)

**Map Coordinates:**
- **Latitude** - GPS latitude coordinate
- **Longitude** - GPS longitude coordinate
- You can get these from Google Maps:
  1. Right-click on the property location in Google Maps
  2. Click the coordinates to copy them

5. Click **"Publish"** to save and make the property live

---

### Editing a Property

1. Open Sanity Studio
2. Click **"Property"** in the left sidebar
3. Click on the property you want to edit
4. Make your changes
5. Click **"Publish"** to save changes

---

### Removing a Property (Sold)

**Option 1: Unpublish (Recommended)**
1. Open the property in Studio
2. Click the **"Unpublish"** button
3. Property will be hidden from the website but saved in Studio

**Option 2: Delete**
1. Open the property in Studio
2. Click the **⋮** (three dots) menu
3. Select **"Delete"**
4. Confirm deletion

---

### Managing Images

**Upload Images:**
- Click on any image field
- Click "Upload" or drag and drop images
- Supported formats: JPG, PNG, WebP
- Recommended size: At least 1920x1080px

**Optimize Images:**
- Sanity automatically optimizes images
- Images are served through Sanity's CDN for fast loading

**Reorder Gallery Images:**
- Drag images up or down in the Gallery Images field

---

## Managing Neighborhoods

Sanity Studio also has a **Neighborhood** content type for managing neighborhood information.

### Adding a Neighborhood:

1. Click **"Neighborhood"** in the left sidebar
2. Click **"+ Create"**
3. Fill in:
   - **Neighborhood Name** (e.g., "Dubai Marina")
   - **Slug** (auto-generated URL-friendly name)
   - **Description** (brief description)
   - **Full Description** (detailed information)
   - **Main Image** (cover image)
   - **Gallery Images** (additional photos)
   - **Highlights** (key features)
   - **Nearby Facilities** (similar to properties)
4. Click **"Publish"**

---

## Tips & Best Practices

### Property Titles
✅ **Good:** "Spacious 3BR Apartment with Sea View - Dubai Marina"
❌ **Avoid:** "3BR Apt"

### Descriptions
- Write 3-5 paragraphs
- Highlight unique features
- Mention views, finishes, and lifestyle benefits
- Include information about building amenities

### Images
- Upload high-quality images (at least 5-7 per property)
- First image should be the most appealing (exterior or best view)
- Include: exterior, living room, bedrooms, kitchen, bathrooms, views
- Ensure images are well-lit and professionally shot

### Featured Properties
- Feature only your best 3-6 properties
- Update featured properties regularly
- Balance property types (villas, apartments, etc.)

### Pricing
- Enter prices without commas (e.g., 5500000 not 5,500,000)
- Keep prices up to date
- Update when price changes

---

## Deploying Sanity Studio

Once you're ready to manage properties from anywhere (not just locally):

### Option 1: Deploy Studio to Sanity Cloud (Free)

```bash
npm run studio:deploy
```

This deploys your Studio to: `https://your-project-name.sanity.studio`

### Option 2: Host Studio on Your Website

Add this to your website's Vite config to serve Studio at `/admin`:
- Studio will be accessible at `https://yourwebsite.com/admin`

---

## CORS Configuration

To allow your website to fetch data from Sanity:

1. Go to https://sanity.io/manage
2. Select your project: **Estates By Sapna**
3. Go to **Settings** → **API**
4. Under **CORS Origins**, click **"+ Add CORS origin"**
5. Add your website URLs:
   - `http://localhost:5173` (for development)
   - `https://yourwebsite.com` (for production)
   - `https://yourusername.github.io` (if using GitHub Pages)
6. Check **"Allow credentials"**
7. Click **"Save"**

---

## Troubleshooting

### Properties not showing on website?
1. Make sure properties are **Published** (not just saved as draft)
2. Check that `.env` file has correct `VITE_SANITY_PROJECT_ID`
3. Clear browser cache and refresh

### Can't upload images?
1. Check file size (max 10MB recommended)
2. Ensure image format is JPG, PNG, or WebP
3. Try a different image

### Studio not loading?
1. Make sure you're logged into Sanity
2. Check that `studio/.env` has correct project ID
3. Try running `npm install` again

### Website showing old data?
- Sanity uses CDN caching
- Changes may take 1-2 minutes to appear
- Hard refresh the page (Cmd+Shift+R on Mac, Ctrl+F5 on Windows)

---

## Support

- **Sanity Documentation:** https://www.sanity.io/docs
- **Sanity Community:** https://www.sanity.io/community
- **Your Project Dashboard:** https://sanity.io/manage/personal/project/rx98mfqq

---

## Quick Reference

| Task | Command |
|------|---------|
| Start website | `npm run dev` |
| Start Sanity Studio | `npm run studio:dev` |
| Deploy Studio | `npm run studio:deploy` |
| Build website | `npm run build` |

**Studio URL (Local):** http://localhost:3333
**Sanity Project ID:** rx98mfqq
