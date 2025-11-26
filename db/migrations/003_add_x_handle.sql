-- ============================================
-- SUPABASE MIGRATION: Add x_handle column
-- ============================================
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- Add x_handle column for X (Twitter) profile links
ALTER TABLE public.gallery 
ADD COLUMN IF NOT EXISTS x_handle TEXT;

