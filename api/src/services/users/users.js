import CryptoJS from 'crypto-js'

import { UserInputError } from '@redwoodjs/api'

import { db } from 'src/lib/db'
export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const generateLoginToken = async ({ email }) => {
  console.log({ function: 'generateLoginToken', email })
  try {
    // look up if the user exists
    let lookupUser = await db.user.findFirst({ where: { email } })
    if (!lookupUser) return { message: 'Login Request received' }

    // here we're going to generate a random password of 6 numbers, then hash it properly
    let randomNumber = (() => {
      let number = Math.floor(Math.random() * 1000000)
      if (number < 100000) number = number + 100000
      return number.toString()
    })()
    console.log({ randomNumber })
    // because we're really just modifying how dbauth worked we have a salt
    // and a hashedPassword.  We're going to use the salt to hash the random number
    // and then store that in the hashedPassword field
    // first we'll generate a new salt
    // here you'd want to send the email with the random number
    // to the user and then have them enter it in the login form
    let salt = (() => {
      let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      charSet += 'abcdefghijklmnopqrstuvwxyz'
      charSet += '0123456789'
      let randomString = ''
      for (var i = 0; i < 30; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
      }
      return randomString
    })()
    // now we'll hash the random number with the salt
    let loginToken = CryptoJS.PBKDF2(randomNumber, salt, {
      keySize: 256 / 32,
    }).toString()
    //console.log({ loginToken })
    // now we'll update the user with the new salt and hashedPassword
    let loginTokenExpiresAt = new Date()
    loginTokenExpiresAt.setMinutes(loginTokenExpiresAt.getMinutes() + 15)
    await db.user.update({
      where: { id: lookupUser.id },
      data: {
        salt,
        loginToken,
        loginTokenExpiresAt,
      },
    })

    return { message: 'Login Request received' }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }
}
