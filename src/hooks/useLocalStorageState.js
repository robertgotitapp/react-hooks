import {useState, useEffect} from 'react'

export default (key, defaultValue, {
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) => {
  const [value, setValue] = useState( () => {
    const value = window.localStorage.getItem(key)
    if (value) {
      return deserialize(value)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, serialize(value))
  }, [key, value, serialize])

  return [
    value,
    setValue
  ]
}