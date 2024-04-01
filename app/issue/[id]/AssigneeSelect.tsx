"use client"

import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root  defaultValue="1" >
        <Select.Trigger/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestion</Select.Label>
                <Select.Item value='1'>Mosh Hamedani</Select.Item>
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect;
