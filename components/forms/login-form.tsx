import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/authContext'
import Link from 'next/link'

interface LoginType {
	email: string
	password: string
}

const LoginForm: React.FC = () => {
	const methods = useForm<LoginType>({ mode: 'onBlur' })

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods

	const { logIn } = useAuth()
	const router = useRouter()

	const onSubmit = async (data: LoginType) => {
		try {
			await logIn(data.email, data.password)
			router.push('/dashboard')
		} catch (error: any) {
			console.log(error.message)
		}
	}

	return (
		<div className='w-full md:w-96 mx-auto'>
			<h2 className='px-12 text-center text-2xl font-semibold text-blue-900'>
				Log In
			</h2>
			<p className='mt-2 text-center text-md text-gray-600'>
				{"Don't have an account? "}
				<Link href='/signup'>
					<a href='#' className='text-blue-500'>
						Sign Up
					</a>
				</Link>
			</p>
			<FormProvider {...methods}>
				<form
					action=''
					className='w-full mx-auto pb-12 px-4'
					onSubmit={handleSubmit(onSubmit)}>
					<div className='mt-8'>
						<div className='flex items-center justify-between'>
							<label
								htmlFor=''
								className='block mb-3 font-sans text-blue-900'>
								Email
							</label>
						</div>

						<input
							type='email'
							{...register('email', {
								required: 'Email is required',
							})}
							className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
						/>
						{errors.email && (
							<p className='text-red-400'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div className='mt-8'>
						<div className='flex items-center justify-between'>
							<label
								htmlFor=''
								className='block mb-3 font-sans text-blue-900'>
								Password
							</label>
						</div>

						<input
							type='password'
							{...register('password', {
								required: 'Password is required',
							})}
							className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
						/>
						{errors.password && (
							<p className='text-red-400'>
								{errors.password.message}
							</p>
						)}
					</div>

					<div className='flex justify-center pt-8'>
						<button
							type='submit'
							className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}>
							<p className='capitalize text-white font-normal'>
								submit
							</p>
						</button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
export default LoginForm
