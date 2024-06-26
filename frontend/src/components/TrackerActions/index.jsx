import { useState } from "react";
import InputWrapper from "../InputWrapper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../Button";
import { useEffect } from "react";
import { transactionValidationSchema } from "../../validations/transaction.schema";
import { apiClient } from "../../app/apiClient";

function TrackerActions({ setTransactions, userId }) {
	const initialValues = {
		description: "",
		amount: "",
		type: "Надходження",
		date: "",
	};

	const [maxDate, setMaxDate] = useState("");

	const cancelClick = () => {
		clearStateOperation();
	};

	useEffect(() => {
		updateMaxDate();
	}, []);

	function updateMaxDate() {
		const today = new Date().toISOString().split("T")[0];
		setMaxDate(today);
	}

	const createTransactions = async (values, { resetForm }) => {
		try {
			const responce = await apiClient.post("users/transaction", {
				...values,
				amount: +values.amount,
				userId: userId,
			});
			const { data } = responce;
			setTransactions((prev) => [...prev, data]);
			resetForm();
		} catch (error) {}
	};

	return (
		<div className='w-full h-5/6 flex flex-col mt-5 cursor-pointer'>
			<Formik
				initialValues={initialValues}
				validationSchema={transactionValidationSchema}
				onSubmit={createTransactions}>
				{({ values }) => (
					<Form className='w-11/12 mx-auto bg-backgroundForm rounded-t-xl h-full flex mt-2'>
						<div className='w-10/12 mx-auto flex flex-col'>
							<div className='mt-4'>
								<Field
									type='text'
									inputName='description'
									name='description'
									labelValue='Опис'
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 text-xs'
									name='description'
									component='span'
								/>
							</div>
							<div className='mt-4'>
								<Field
									type='text'
									labelValue='Сума ₴'
									inputName='amount'
									name='amount'
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 text-xs'
									name='amount'
									component='span'
								/>
							</div>
							<div className='mt-4'>
								<Field
									labelValue='Дата'
									inputName='date'
									type='date'
									name='date'
									required
									max={maxDate}
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 text-xs'
									name='date'
									component='span'
								/>
							</div>
							<div class='flex items-center justify-evenly my-4'>
								<div className=''>
									<Field
										id='expence-radio'
										type='radio'
										name='type'
										value='Надходження'
										checked={values.type === "Надходження"}
									/>
									<label
										htmlFor='expence-radio'
										className='ml-3 text-textColor text-xl'>
										Надходження
									</label>
								</div>
								<div className=''>
									<Field
										id='income-radio'
										type='radio'
										value='Витрата'
										checked={values.type === "Витрата"}
										name='type'
									/>
									<label
										htmlFor='income-radio'
										className='ml-3 text-textColor text-xl'>
										Витрата
									</label>
								</div>
							</div>
							<div class='flex items-center'></div>

							<div className='mb-2 mt-5 flex mx-auto gap-5'>
								<Button onClick={cancelClick}>Відмінити</Button>
								<Button type='submit'>Підтвердити</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default TrackerActions;
