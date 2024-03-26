import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'


export const useUserStore = defineStore('user', () => {
    const user = ref(null)
  
    async function fetchUserProfile(userId) {
      if (!userId) {
        user.value = null
        return
      }
  
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()
  
      if (error) {
        console.error('Error fetching user profile:', error)
      } else {
        user.value = data
      }
    }
  
    return { user, fetchUserProfile }
  })