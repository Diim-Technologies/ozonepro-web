import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import { Box, Center } from '@chakra-ui/react';


const Verify = () => {


 
  const PersonaComponent = dynamic(() => import('../components/Persona/PersonaComponent'), {
    ssr: false
})

  return (
    <Center className='persona'>
      <PersonaComponent/>
    </Center>
  )
}

export default Verify