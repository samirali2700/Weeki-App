import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAppSelector } from "./reduxHook";
import { ChatContent, ChatOverview, PublicRoom } from "../interfaces/Chat"

const url = 'https://myapp-567d6-default-rtdb.europe-west1.firebasedatabase.app/';



export const useGetMembers = () => {
    const { localId } = useAppSelector(state => state.user.auth);

    async function fetchMembers () {
        return await (await axios.get(url+'members.json')).data
    }
    const data = useQuery('members', fetchMembers);
    let members = [];
    for(const key in data.data) {
        if(key !== localId){
            members.push({id: key, email: data.data[key].email});
        }
    }
    return { data, members };
}


export const useGetChatOverview = () => {
    const {isLoading, data, isSuccess, isError, refetch } = useQuery('chats', async () => {
        return (await axios.get(url + 'public.json')).data
    });

    let chats: ChatOverview[] = [];

    for(const key in data) {
        const chat = data[key];
        const content = {
            id: key,
            lastMessage: chat?.lastMessage,
            from: chat?.from,
            timestamp: chat?.timestamp,
            title: chat.title
        } as ChatOverview
        chats.push(content)
    }
 
    //sort the chats in desc order, newest in top
    chats.sort(function(a, b) {return  b.timestamp - a.timestamp});

    return {isLoading, chats, isSuccess, isError, refetch }    
}



export const useGetChatContent = (roomId: string) => {
    const {email} = useAppSelector(state => state.user.user);

    const {isLoading, data, isSuccess, isError, refetch } = useQuery(['chat', roomId], async () =>  {
        return await (await axios.get(url + 'chats/public/' + roomId + '.json')).data
    });

    let chats: ChatContent[] = [];

    for(const key in data) {
        const chat = data[key];

        let from = chat.from;
        if(from === email){
            from = 'dig';
        }
      
        const content = {
            id: key,
            message: chat.message,
            from: from,
            timestamp: new Date(chat.timestamp).toLocaleTimeString(),
        } as ChatContent


        chats.push(content)
    }
    return {isLoading, chats, isSuccess, isError, refetch }  
}


export const usePostNewPublicChat = () => {
    const { idToken } = useAppSelector(state => state.user.auth);
    const { email } = useAppSelector(state => state.user.user);

    return useMutation((newRoom: PublicRoom) => {
        const room: PublicRoom = {
            title: newRoom.title,
            lastMessage: newRoom.lastMessage,
            from: email,
            admin: email,
            timestamp: new Date().getTime(),
            createdAt: new Date().getTime(),
        }
        return axios.post(url + '/public.json/?auth=' + idToken, room);
    })
}


export const usePostChat = () => {
    const { idToken, localId } = useAppSelector(state => state.user.auth);
    const {email} =  useAppSelector(state => state.user.user);

    return useMutation((chat: ChatContent) => {

        //patch to the overview branch
        axios.patch(url+'public/'+chat.id+'.json', {lastMessage: chat.message, from: email, timestamp: new Date().getTime() } );

        //post to the public chat branch
        return axios.post(url + '/chats/public/'+chat.id+'.json', {message: chat.message, from: email, timestamp: new Date().getTime() });
    });
}


// export const usePostChatOverview = () => {
//     const { idToken, localId } = useAppSelector(state => state.user.auth);
//     const { email } = useAppSelector(state => state.user.user)

//     return useMutation((chatOverview: ChatOverview) => {
//         const roomId = chatOverview.id;
//         chatOverview.members.map( async (item) => {
//             await axios.patch(url+'permissions/'+item.id+'.json?auth='+idToken, {[roomId]: true});    
//         })
//         axios.patch(url+'permissions/'+localId+'.json?auth='+idToken, {[roomId]: true});
//         return axios.put(url+'overview/'+roomId+'.json?auth='+idToken, {createdBy: email, createdAt: new Date().getTime()});
//     })
// }

