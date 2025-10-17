# Murder Mystery Voting App

A web application for live murder mystery shows that allows audience members to vote for who they think the murderer is, with admin capabilities for show management.

## Features

- **Character Playbill**: Display all characters with their backstories and roles
- **One-Time Voting**: Audience members can vote once per show (uses local storage to prevent repeat voting)
- **Show Management**: Separate voting for 4PM and 8PM shows
- **Admin Dashboard**: Password-protected admin view to see vote tallies and clear votes between shows
- **Mobile Optimized**: Responsive design perfect for mobile viewing
- **Vintage Noir Theme**: Dramatic red, black, and yellow styling matching classic murder mystery aesthetics

## Quick Setup Guide

### 1. Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. In the SQL Editor, run this command to create the votes table:

```sql
CREATE TABLE votes (
  id BIGSERIAL PRIMARY KEY,
  character_id INTEGER NOT NULL,
  character_name TEXT NOT NULL,
  voter_id TEXT NOT NULL,
  show_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is a simple voting app)
CREATE POLICY "Allow all operations on votes" ON votes
FOR ALL USING (true);
```

4. Go to Settings > API to get your:
   - Project URL (SUPABASE_URL)
   - Public anon key (SUPABASE_ANON_KEY)

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your-actual-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to test the application.

### 5. Deploy to Netlify

#### Option A: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git"
4. Connect your GitHub repository
5. Netlify will auto-detect the settings from `netlify.toml`
6. Add environment variables in Netlify:
   - Go to Site settings > Environment variables
   - Add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
7. Deploy!

#### Option B: Manual Deploy
1. Build the project:
   ```bash
   npm run build
   ```
2. Drag the `dist` folder to Netlify's deploy area
3. Add environment variables in Site settings

## Usage

### For Audience Members
1. View the character playbill to learn about all suspects
2. Click "Vote" to cast your vote for who you think is the murderer
3. You can only vote once per device/browser

### For Show MC/Admin
1. Click "Admin" button
2. Enter password: `gazelle1` (you can change this in `App.js`)
3. View vote tallies for each show (4PM/8PM)
4. Clear votes between shows or reset everything

## Customization

### Change Characters
Edit the `characters` array in both `src/components/Playbill.js` and `src/components/VotingInterface.js`

### Change Admin Password
Edit the password in `src/App.js` in the `handleAdminLogin` function

### Modify Show Times
Edit the show time logic in `src/components/VotingInterface.js` and the options in `src/components/AdminDashboard.js`

### Update Styling
All styles are in `src/styles.css` - modify colors, fonts, and layout as needed

## Technical Details

- **Frontend**: React with Webpack
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Netlify
- **Voting Prevention**: Browser localStorage + unique voter IDs
- **Mobile Responsive**: CSS Grid and Flexbox with mobile-first design

## Troubleshooting

### Votes Not Saving
- Check Supabase credentials in environment variables
- Verify the votes table was created correctly
- Check browser console for error messages

### Can't Access Admin
- Verify the admin password in `App.js`
- Check that you're not trying to access admin while in vote mode

### Mobile Display Issues
- Clear browser cache
- Ensure you're using the latest version of the app
- Test in different browsers

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Test the Supabase connection in the Supabase dashboard

---

**Live Show Ready!** 🎭 Your murder mystery voting app is ready for showtime!# moonglade
