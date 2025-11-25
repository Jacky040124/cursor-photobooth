-- ============================================
-- SUPABASE MIGRATION: Photobooth Gallery Setup
-- ============================================
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- ============================================
-- PART 1: Create Gallery Table
-- ============================================

CREATE TABLE public.gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  secret TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster ordering by date
CREATE INDEX gallery_created_at_idx ON public.gallery (created_at DESC);

-- ============================================
-- PART 2: Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view gallery photos
CREATE POLICY "Anyone can view gallery" 
  ON public.gallery 
  FOR SELECT 
  USING (true);

-- Policy: Anyone can add photos (anonymous uploads)
CREATE POLICY "Anyone can add to gallery" 
  ON public.gallery 
  FOR INSERT 
  WITH CHECK (true);

-- ============================================
-- PART 3: Create Storage Bucket
-- ============================================
-- Note: Run this separately if it fails (bucket might already exist)

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- PART 4: Storage Bucket Policies
-- ============================================

-- Policy: Anyone can view photos (public bucket)
CREATE POLICY "Public read access for photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'photos');

-- Policy: Anyone can upload photos
CREATE POLICY "Anyone can upload photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'photos');

-- ============================================
-- DONE! Your photobooth is ready to use.
-- ============================================
