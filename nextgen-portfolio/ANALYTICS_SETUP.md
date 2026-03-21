# Analytics Dashboard Setup Guide

## Overview
The Analytics Dashboard tracks portfolio engagement including:
- **Total Visits**: Count of all page visits
- **Unique Visitors**: Estimated unique visitor count
- **Section Views**: Track which sections users view most
- **Geographic Data**: Visitor locations on a world map

## Files Created

### 1. Schema
- `sanity/schemaTypes/analytics.ts` - Sanity schema for analytics data
- Updated `sanity/schemaTypes/index.ts` - Added analytics to schema exports

### 2. API Routes
- `app/api/analytics/route.ts` - POST/GET endpoints for tracking and fetching analytics

### 3. Hooks
- `hooks/use-analytics.ts` - Client-side hook for tracking visits and sections

### 4. Components
- `components/sections/AnalyticsDashboard.tsx` - Main dashboard UI
- `components/SectionTracker.tsx` - Wrapper to track section views
- `components/AnalyticsProvider.tsx` - Provider to initialize tracking

### 5. Data
- `Data/analytics.ndjson` - Initial analytics data for Sanity

## Setup Instructions

### Step 1: Import Analytics Data to Sanity
```bash
cd Data
# On Windows
sanity dataset import analytics.ndjson production --replace

# On Mac/Linux
./import-all.sh
```

### Step 2: Verify Schema
The analytics schema has been added to your Sanity Studio. Restart your dev server:
```bash
npm run dev
```

### Step 3: Check Sanity Studio
Visit `http://localhost:3000/studio` and verify the "Analytics" document type appears.

## How It Works

### Automatic Tracking
1. **Page Visit**: Tracked automatically when user loads the portfolio
2. **Section Views**: Tracked when user scrolls to 50% of each section
3. **Geographic Data**: Uses ipapi.co to get visitor location (free tier)

### Data Flow
```
User visits → AnalyticsProvider → Track visit + location
User scrolls → SectionTracker → Track section view
Dashboard → Fetch analytics → Display charts
```

## Features

### 1. Stats Cards
- Total Visits counter
- Unique Visitors (placeholder - implement with cookies/localStorage)
- Countries count
- Total Section Views

### 2. Popular Sections Chart
- Bar chart showing views per section
- Helps identify most engaging content

### 3. Top Visitor Locations
- List of top 10 cities/countries
- Shows visit count per location

### 4. Section Distribution
- Pie chart showing engagement distribution
- Percentage breakdown of section views

## Customization

### Change Refresh Rate
Edit `AnalyticsDashboard.tsx`:
```typescript
const interval = setInterval(fetchAnalytics, 30000); // 30 seconds
```

### Add More Sections
Edit `analytics.ts` schema and add to sectionViews object:
```typescript
{ name: "blog", type: "number", title: "Blog Section", initialValue: 0 }
```

### Change Location API
Replace ipapi.co in `use-analytics.ts` with:
- ipgeolocation.io
- ip-api.com
- Your own backend service

## Privacy Considerations

### Current Implementation
- No cookies or localStorage used
- IP-based geolocation (anonymous)
- No personal data collected

### GDPR Compliance
To make fully GDPR compliant:
1. Add cookie consent banner
2. Allow users to opt-out
3. Add privacy policy link
4. Implement data deletion requests

### Recommended Changes
```typescript
// Check consent before tracking
if (hasUserConsent()) {
  trackVisit();
  trackLocation();
}
```

## Troubleshooting

### Analytics Not Tracking
1. Check browser console for errors
2. Verify API route is accessible: `http://localhost:3000/api/analytics`
3. Check Sanity permissions for write access

### Dashboard Not Loading
1. Verify analytics document exists in Sanity
2. Check network tab for API errors
3. Ensure recharts is installed: `npm install recharts`

### Location Not Tracking
1. ipapi.co has rate limits (free tier: 1000 requests/day)
2. Check if API is blocked by adblockers
3. Consider implementing server-side location tracking

## Future Enhancements

### Suggested Features
- [ ] Real-time visitor counter
- [ ] Session duration tracking
- [ ] Click tracking on CTAs
- [ ] Referrer source tracking
- [ ] Device/browser analytics
- [ ] A/B testing support
- [ ] Export analytics data
- [ ] Email reports

### Advanced Implementation
- Use Redis for real-time data
- Implement WebSocket for live updates
- Add Google Analytics integration
- Create admin dashboard with filters

## Performance

### Current Impact
- Minimal: ~2KB additional JS
- API calls: 1 on load + 1 per section view
- Dashboard refresh: Every 30 seconds

### Optimization Tips
- Debounce section tracking
- Batch API requests
- Cache analytics data
- Use CDN for location API

## Support

For issues or questions:
1. Check Sanity Studio for data
2. Review browser console logs
3. Test API endpoints directly
4. Verify schema is properly imported

---

**Note**: This is a basic analytics implementation. For production use, consider:
- Privacy compliance (GDPR, CCPA)
- Rate limiting on API routes
- Data retention policies
- Backup and recovery
