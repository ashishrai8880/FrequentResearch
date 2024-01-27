import React, { useEffect, useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import axios from 'axios' ;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

    const [user, setUser] = useState({
        first_name : undefined ,
        last_name : undefined ,
        email : undefined ,
        country : undefined ,
        state : undefined ,
        city : undefined ,
        gender : undefined ,
        date_of_birth : undefined ,
        age : undefined ,
        password : undefined ,
    }) ;

    const [country, setCountry] = useState([]) ;
    const [state, setState] = useState([]) ;
    const [city, setCity] = useState([]) ;

    const onChange = (e)=>{

        if (e instanceof Date) {
          // It's the date picker
          setUser((prevUser) => ({
            ...prevUser,
            date_of_birth: e,
            age: calculateAge(e),
          }));
        } 
        else if(e.target.name == 'country'){
          let { name, value } = e.target;
          value = JSON.parse(value)
          handleCountryChange(value);
          setUser(prevUser => ({
              ...prevUser,
              [name]: value.title,
          }));
        }
        else if(e.target.name == 'state'){
          let { name, value } = e.target;
          value = JSON.parse(value)
          handleStateChange(value);
          setUser(prevUser => ({
              ...prevUser,
              [name]: value.title,
          }));
        }
        else if(e.target.name == 'city'){
          let { name, value } = e.target;
          value = JSON.parse(value)
          console.log('city : ',value)
          setUser(prevUser => ({
              ...prevUser,
              [name]: value.title,
          }));
        }
        else{
          const { name, value } = e.target;
          setUser(prevUser => ({
              ...prevUser,
              [name]: value,
          }));
        }
        

        console.log('new user : ',user)
    }

    const onSubmit = async (e)=>{
      e.preventDefault();

      // let res = await axios.post('http://localhost:3001/api/auth/register' , user) ;

      axios.post('http://localhost:3001/api/auth/register' , user).then((res)=>{
        toast.success('You have successfully registered !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          setTimeout(() => {
            navigate('/');
          }, 2000);

      })
      .catch((error)=>{
        toast.error(`Error : ${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        console.log('Error : ',error.response.data.message)
        
      })

      
      // setUser({});

    }

    const calculateAge = (dob) => {
      if (!dob) return undefined;
  
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age;
    };

    const getCountryList =async ()=>{
      let data = await axios.get('http://localhost:3001/api/auth/country/list') ;
      setCountry(data.data.data)
      // console.log('counotry list : ',data.data.data) ;
    }

    const handleCountryChange =async (value)=>{
      let data = await axios.get(`http://localhost:3001/api/auth/state/state_by_country?country_id=${value.id}`) ;
      setState(data.data.data)
    }

    const handleStateChange =async (value)=>{
      let data = await axios.get(`http://localhost:3001/api/auth/city/city_by_state?state_id=${value.state_id}`) ;
      setCity(data.data.data)
    }

    useEffect(() => {
      getCountryList();
    }, [])


    

  return (
    <>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <section className="h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          We are The Lotus Team
                        </h4>
                      </div>

                      <form>
                        <p className="mb-4">Please register an account</p>
                        
                        <TEInput
                          onChange={onChange}
                          name="first_name"  
                          value={user.first_name  || ''}
                          type="text"
                          label="First Name"
                          className="mb-4"
                        ></TEInput>
                        
                        <TEInput
                          onChange={onChange}
                          name="last_name"
                          value={user.last_name  || ''}
                          type="text"
                          label="Last Name"
                          className="mb-4"
                        ></TEInput>
                        
                        <TEInput
                          onChange={onChange}
                          name="email"
                          value={user.email  || ''}
                          type="text"
                          label="Email"
                          className="mb-4"
                        ></TEInput>
                        

                        <div className="relative mb-4">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                          <select id="country" name="country" onChange={onChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                            <option value="" disabled selected>Select Country</option>
                            {country.map(ele => (
                             <option key={ele.id} value={JSON.stringify(ele)}>{ele.title}</option>
                            ))}
                          </select>
                        </div>
                        

                        <div className="relative mb-4">
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                          <select id="state" name="state" onChange={onChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                            <option value="" disabled selected>Select State</option>
                            {state.map(state => (
                             <option key={state.id} value={JSON.stringify(state)}>{state.title}</option>
                            ))}
                          </select>
                        </div>
                        

                        <div className="relative mb-4">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                          <select id="city" name="city" onChange={onChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                            <option value="" disabled selected>Select City</option>
                            {city.map(ele => (
                             <option key={ele.id} value={JSON.stringify(ele)}>{ele.title}</option>
                            ))}
                          </select>
                        </div>
                                          

                        <div className="flex items-center mb-4">
                          <label className="mr-4">Gender:</label>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="male"
                              name="gender"
                              value='male'
                              checked={user.gender == 'male'}
                              onChange={onChange}
                              className="mr-2"
                            />
                            <label htmlFor="male" className="mr-4">
                              Male
                            </label>

                            <input
                              type="radio"
                              id="female"
                              name="gender"
                              value='female'
                              checked={user.gender == 'female'}
                              onChange={onChange}
                              className="mr-2"
                            />
                            <label htmlFor="female">Female</label>
                          </div>
                        </div>

                        <div>
                          <label>Date of Birth : </label>
                          <DatePicker
                            name="date_of_birth"
                            selected={user.date_of_birth}
                            onChange={onChange}
                            showYearDropdown
                            dateFormat="yyyy-MM-dd"
                            className="mb-4"
                          />
                        </div>  
                                                
                        <TEInput
                          onChange={onChange}
                          name="age"
                          value={user.age !== undefined ? user.age : ''}
                          type="text"
                          label="Age"
                          className="mb-4"
                        ></TEInput>

                        
                        <TEInput
                          onChange={onChange}
                          name="password"
                          value={user.password  || ''}
                          type="password"
                          label="Password"
                          className="mb-4"
                        ></TEInput>

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <TERipple rippleColor="light" className="w-full">
                            <button
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="submit"
                              onClick={onSubmit}
                              style={{
                                background:
                                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                              }}
                            >
                              Register
                            </button>
                          </TERipple>

                          {/* <!--Forgot password link--> */}
                          <a href="#!">Terms and conditions</a>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Have an account?</p>
                          <TERipple rippleColor="light">
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Login
                            </button>
                          </TERipple>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
