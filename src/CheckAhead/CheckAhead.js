import React, { useState, useEffect } from 'react'
import './check-ahead.css'

export const CheckAhead = ({ label }) => {
  const xSpan = <span>&#10005;</span>
  const checkSpan = <span>&#10004;</span>

	const [ isDisabled, setEnabled ] = useState(false)
  const [ isLongEnough, setIsLongEnough ] = useState(false)
  const [ hasLowerCase, setHasLowerCase ] = useState(false)
  const [ hasUpperCase, setHasUpperCase ] = useState(false)
  const [ hasNumbers, setHasNumbers ] = useState(false)
  const [ hasSpecialChar, setHasSpecialChar ] = useState(false)

  // useState returns a pair of values
  // the current state and the function that updates that value
	const testInput = (input) => {
    const lowercaseTest = /[a-z]/ // just lowercase letters
    setHasLowerCase(lowercaseTest.test(input))

    const uppercaseTest = /[A-Z]/ // just uppercase
    setHasUpperCase(uppercaseTest.test(input))

    const numbersTest = /[0-9]/ // just numbers
    setHasNumbers(numbersTest.test(input))

    const specialCharsTest = /[*&%$#@]/
    setHasSpecialChar(specialCharsTest.test(input))

    const lengthTest = input.length >= 8
    setIsLongEnough(lengthTest)
  }

  // without this the submit button won't be enabled/disabled as conditions change
  useEffect(() => {
    const shouldEnable = (isLongEnough && hasLowerCase && hasUpperCase && hasNumbers)
    setEnabled(shouldEnable)
  }
  , [isLongEnough, hasLowerCase, hasNumbers, hasUpperCase])

	return (
		<div className='check-ahead-container'>
      <div className='form-container'>
        <label>
          {label}
          <input placeholder='password' type='text' onChange={(e) => testInput(e.target.value)} />
        </label>
        <button className='submit-button' type='submit' disabled={!isDisabled}>
          submit
        </button>
      </div>
      <div className='messages-container'>
        <div>{isLongEnough ? checkSpan : xSpan} password has 8 characters</div>
        <div>{hasLowerCase ? checkSpan : xSpan} password has a lowercase letter</div>
        <div>{hasUpperCase ? checkSpan : xSpan} password has a capital letter</div>
        <div>{hasNumbers ? checkSpan : xSpan} password has a number</div>
        <div>{hasSpecialChar ? checkSpan : xSpan} password has a special character</div>
      </div>
		</div>
	)
}
