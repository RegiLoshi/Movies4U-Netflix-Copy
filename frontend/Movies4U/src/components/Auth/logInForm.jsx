import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/authActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import backgroundImage from '../../assets/background.jpg';

const LogInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            navigate('/home');
        }
    }, [navigate]);

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(logIn(values));
            navigate('/home');
        } catch (error) {
            // Email Not Found
            if(error.status === 404) {
                swal({
                    title: "Authentication Failed",
                    text: "The email you entered does not exist. Please try again.",
                    icon: "error",
                  });
            // Incorrect Password
            }else if(error.status === 401){
                swal({
                    title: "Authentication Failed",
                    text: "The password you entered is incorrect. Please try again.",
                    icon: "error",
                  });
            }else{
                    swal({
                        title: "Registration Failed",
                        text: "An error occurred while registering. Please try again later.",
                        icon: "error",
                      });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }} >
            <div className="px-8 py-6 mt-4 text-left bg-black bg-opacity-70 shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center text-white">Sign in</h3>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mt-4">
                                <div>
                                    <label className="block text-white" htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-white" htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <button 
                                        className="px-6 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                    <a href="#" className="text-sm text-red-600 hover:underline">Forgot password?</a>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="mt-6 text-white text-center">
                    New to Movies4U? 
                    <button 
                        onClick={() => navigate('/register')}
                        className="text-red-600 hover:underline ml-1"
                    >
                        Sign up now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogInForm;

