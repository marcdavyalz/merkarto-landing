#!/usr/bin/env node

/**
 * Deployment script for Okulus Landing Page
 * This script helps deploy to Vercel with proper environment checks
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Okulus deployment process...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: .env.local file not found!');
  console.log('Please create .env.local with your Supabase credentials:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your_url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_key\n');
  process.exit(1);
}

try {
  // Run build to check for errors
  console.log('🔧 Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!\n');

  // Deploy to Vercel
  console.log('🌐 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('✅ Deployment completed!\n');

  console.log('🎉 Okulus landing page is now live!');
  console.log('Don\'t forget to:');
  console.log('1. Set up your custom domain in Vercel dashboard');
  console.log('2. Configure environment variables in Vercel');
  console.log('3. Test the waitlist form functionality\n');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
