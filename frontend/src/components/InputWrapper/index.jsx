function InputWrapper({
	id = "",
	inputName = "",
	labelValue,
	placeholder = "",
	onChange,
	type = "text",
	max,
	value,
}) {
	return (
		<div className='flex flex-col'>
			<label
				className='text-[#A48BA6] mb-2 font-light text-sm'
				htmlFor={inputName}>
				{labelValue}
			</label>
			<input
				className='border-0 outline-none border-textColor border-b-2 xs:text-sm bg-transparent placeholder:text-textColor text-textColor text-xl'
				type={type}
				id={inputName}
				placeholder={placeholder}
				value={value && value}
				onChange={onChange}
				name={inputName}
				max={max && max}
			/>
		</div>
	);
}

export default InputWrapper;
