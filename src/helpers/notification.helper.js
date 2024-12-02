const notificationPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/notification`

const sendNotification = async(notification) => {


    const url = notificationPath
    try {
    
        const response = await fetch(url, {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(notification),
            mode: 'cors'
        
        });
        const result = await response.json();

        console.log(result.data)

    } catch (error) {
        console.log(error)
    }
    
}
const updateNotification = async(notification) => {


    const url = notificationPath
    try {
    
        const response = await fetch(url, {
            method: "PATCH", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(notification),
            mode: 'cors'
        
        });
        const result = await response.json();

        console.log(result.data)

    } catch (error) {
        console.log(error)
    }
    
}

export default {
    sendNotification,
    updateNotification
}

