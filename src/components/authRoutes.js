import { setUserToken, clearUserToken } from '../utils/authToken'

export const registerUser = async (data) => {
  //const URL = "http://localhost:4000"
  const URL = "https://joyern-backend.onrender.com"

    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const newUser = await fetch(URL + '/auth/register', configs)
      

      const parsedUser = await newUser.json()
      

      setUserToken(parsedUser.token)
      return parsedUser
    } catch(err) {
      console.log(err)
      clearUserToken();
  }
}

 export const loginUser = async (data) => {
  //const URL = "http://localhost:4000"
  const URL = "https://joyern-backend.onrender.com"
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch(URL + '/auth/login', configs)

      const user = await response.json()
      setUserToken(user.token)
      return user
      
    } catch(err) {
      console.log(err)
      clearUserToken()
    }
  }

  export const logoutUser = async (data) => {
    //const URL = "http://localhost:4000"
    const URL = "https://joyern-backend.onrender.com"
    try{
        let response = await fetch(URL + '/auth/logout')
        response = response.json()
        clearUserToken()
        return response.message
    } catch(err) {
        console.log(err)
        clearUserToken()
    }
  }
