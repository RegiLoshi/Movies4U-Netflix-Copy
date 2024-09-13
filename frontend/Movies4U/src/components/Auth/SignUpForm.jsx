import { useDispatch } from 'react-redux';
import { register } from '../../redux/authActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import backgroundImage from '../../assets/background.jpg';
import swal from 'sweetalert';

const SignUpForm = () => {
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
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        dateOfBirth: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        surname: Yup.string().required('Required'),
        username: Yup.string().required('Required').matches(/^[a-zA-Z0-9_]{3,30}$/, '3-30 characters, letters, numbers, and underscores only'),
        email: Yup.string().email('Invalid email address').required('Required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA]+$/, 'Email format only'),
        password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
        dateOfBirth: Yup.date().required('Required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await dispatch(register(values));
            navigate('/home');
        } catch (error) {
            if(error.status === 409){
                swal({
                    title: "Registration Failed",
                    text: "The email or username you entered already exists. Please try again.",
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
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }} >
            <div className='px-8 py-6 text-left block bg-black bg-opacity-70 shadow-lg rounded-lg'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <h3 className="text-2xl font-bold text-center text-white">Sign Up</h3>
                            
                            {['name', 'surname', 'username', 'email', 'password'].map((fieldName) => (
                                <div className="mt-4" key={fieldName}>
                                    <label className="block text-white" htmlFor={fieldName}>
                                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                    </label>
                                    <Field
                                        className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600'
                                        type={fieldName === 'password' ? 'password' : 'text'}
                                        name={fieldName}
                                        placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                    />
                                    <ErrorMessage name={fieldName} component="div" className="text-red-500 text-sm" />
                                </div>
                            ))}

                            <div className="mt-4">
                                <label className="block text-white" htmlFor="dateOfBirth">Date Of Birth</label>
                                <Field
                                    className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-600'
                                    type="date"
                                    name="dateOfBirth"
                                />
                                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className='flex justify-center'>
                                <button type="submit"
                                    disabled={isSubmitting}
                                    className='text-white text-center bg-red-600 rounded-md px-6 py-2 mt-6 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity'
                                >
                                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="mt-6 text-white text-center flex justify-between items-baseline">
                    Already have an account?
                    <button
                        className='bg-red-600 rounded-md px-4 py-2 ml-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                        onClick={() => navigate('/login')}>
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;