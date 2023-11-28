import { Button } from '@/components/ui/button'
import { followUserAction } from '@/utils/actions/actions'
import React from 'react'
import { useToast } from '@/components/ui/use-toast'

interface IParams {
    dbUserId:string
}

function FollowButton(params:IParams) {
    const {toast} = useToast()
    console.log(params.dbUserId)
    async function followUser(dbUserId:string){
        try {
            const res = await followUserAction(dbUserId)
            console.log(res)
            console.log(dbUserId)
            toast({
                title:res.message
            })
        } catch (error) {
            toast({
                title:"Something went wrong!"
            })
        }
    }
  return (
    <Button type='submit' onClick={()=>followUser(params.dbUserId)} >Follow</Button>
  )
}

export default FollowButton