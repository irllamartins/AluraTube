import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ubdmnintdshkstbwkuks.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZG1uaW50ZHNoa3N0YndrdWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMjg0OTcsImV4cCI6MTk4MzkwNDQ5N30.WYxDSpsC96yKUhFKp5sQpODZg6luVqN3_8aXafLQ2HI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}