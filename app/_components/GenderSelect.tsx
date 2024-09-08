import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type GenderOption = ' '| 'Male' | 'Female' | 'Other' 

interface GenderSelectProps {
  value: GenderOption;
  onChange: (event: { target: { name: string; value: GenderOption } }) => void;
}

const genderOptions: { value: GenderOption; label: string }[] = [
  { value: ' ', label: 'Select gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
        Gender
      </label>
      <Select.Root 
        value={value} 
        onValueChange={(newValue: GenderOption) => 
          onChange({ target: { name: 'gender', value: newValue } })
        }
      >
        <Select.Trigger 
          id="gender"
          className="inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <Select.Value placeholder="Select gender" />
          <Select.Icon>
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
            <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
              <ChevronUp size={16} />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              {genderOptions.map((option) => (
                <Select.Item 
                  key={option.value as string} 
                  value={option.value}
                  className="relative flex items-center h-8 px-6 text-sm text-gray-700 rounded-md select-none hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
              <ChevronDown size={16} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default GenderSelect;