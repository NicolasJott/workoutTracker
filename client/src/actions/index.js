import axios from "axios";
import {toast} from "react-toastify";
import {resolvePath} from "react-router-dom";

const generateError = (err) =>
    toast.error(err, {
        position:"bottom-right",
    });

export function signInUser({ email, password }, historyPush, historyReplace) {
    return function (dispatch) {
        axios.post("http://localhost:3001/login", { email, password },{ withCredentials: true })
            .then( response => {

                if(response) {
                    if(response.errors) {
                        const {email,password} = response.errors;
                        if(email) generateError(email);
                        else if (password) generateError(password);
                    } else {
                        localStorage.setItem('jwt', response.token)
                        console.log(localStorage.getItem('jwt'))
                        navigate("/")

                    }
                }
            }catch (err) {
            console.log(err)
        }
            })
    }
}