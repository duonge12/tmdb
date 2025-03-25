import { signInWithEmailAndPassword } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { auth } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";

const text=`In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. Click here to get started.
If you signed up but didn't get your verification email, click here to have it resent.`

export const Login =()=> {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleLogin = async(value) => {
      try{
        const {email, password}=value
        await signInWithEmailAndPassword(auth,email,password)
        const user=auth.currentUser;
        dispatch(fetchAccountInfo(user.uid));
        navigate('/')
      }
      catch(err){
        console.log(err)
      }
      
    };
  
    const handleNavigateToRegister=()=>{
      navigate('/register')
    }
    return (
      <div className="container mx-auto">
        <h1 className="text-[30px]">Login to your account</h1>
        <p>{text}</p>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={(values) => handleLogin(values)}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
  
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <Field 
                  className="outline-0 border rounded-md px-2 py-1"
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Password</label>
                <Field 
                  className="outline-0 border rounded-md px-2 py-1"
                  id="password"
                  name="password"
                  placeholder="jane@acme.com"
                  type="password"
                />
              </div>
            </div>
            <div className="flex gap-2">
                <button className="bg-green-500 rounded-md px-2 py-1 my-2 flex-1" type="submit">Login</button>
                <button 
                    onClick={handleNavigateToRegister} 
                    className="bg-blue-300 rounded-md px-2 py-1 my-2 flex-1"
                >
                        Register
                    </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
  