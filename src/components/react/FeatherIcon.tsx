import { humanize } from '@/lib/utils/textConverter'
import React from 'react'
import * as IconList from 'react-feather'

// Extend IconProps to include the name property
interface FeatherIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

/**
 * This component is a wrapper around react-feather icons prepared to be used in the markdown files content of the project.
 * @see astro.config.js for the configuration of the auto-import plugin.
 * @see https://www.npmjs.com/package/astro-auto-import?activeTab=readme for more information.
 */
export default function FeatherIcon({ name, ...props }: FeatherIconProps) {
  // Process the icon name to match the format in react-feather
  const processIconName = (rawName: string): string => {
    // Remove leading underscore if present
    const nameWithoutUnderscore = rawName.startsWith('_') 
      ? rawName.substring(1) 
      : rawName;
    
    // Convert to PascalCase
    return humanize(nameWithoutUnderscore)
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  };

  const iconName = processIconName(name);
  const IconComponent = IconList[iconName as keyof typeof IconList];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in react-feather`);
    return null;
  }

  return <IconComponent {...props} />;
}