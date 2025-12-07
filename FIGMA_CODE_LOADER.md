# Figma Code Loader Guide

This feature allows you to load code snippets and component code directly from your Figma prototype.

## How It Works

The system extracts code from:
- **Component descriptions** - Code blocks in component descriptions
- **Frame descriptions** - Code in frame/container descriptions  
- **Comments** - Code snippets in Figma comments
- **Text layers** - Code-like text content
- **Component properties** - Code in component property defaults

## Using the Code Loader

### Method 1: Via UI (Recommended)

1. **Click the 🎨 button** in the bottom dock
2. **Enter your Figma file URL**: `https://www.figma.com/file/FILE_KEY/File-Name`
3. **Enter your Figma API token** (get it from [Figma Settings](https://www.figma.com/settings))
4. **Click "Load Code from Figma"**
5. The system will extract and display all found code snippets

### Method 2: Via Environment Variables

Create a `.env` file:

```env
VITE_FIGMA_API_TOKEN=your_token_here
VITE_FIGMA_FILE_KEY=your_file_key_here
```

The code will auto-load on page mount.

## Adding Code to Figma

To prepare code in your Figma prototype, add it in one of these ways:

### 1. Component Description

In Figma, select a component and add a description with code blocks:

```
```vue
<template>
  <view class="my-component">
    <text>{{ message }}</text>
  </view>
</template>
```
```

### 2. Frame Description

Add code to frame descriptions:

```
```scss
.my-component {
  background: #0F172A;
  padding: 32rpx;
}
```
```

### 3. Comments

Add code in comments on any element:

```
```typescript
export const config = {
  apiUrl: 'https://api.example.com'
}
```
```

### 4. Text Layers

Create a text layer with code content (name it appropriately like "Component Code" or "Style Code")

## Code Format

The system automatically detects:
- **Vue components** - `.vue` files
- **HTML/Templates** - Template code
- **CSS/SCSS** - Style code
- **TypeScript/JavaScript** - Script code
- **JSON** - Configuration

## Using Loaded Code

Once code is loaded, you can:

1. **View loaded components** - See list in the modal
2. **View loaded styles** - See list in the modal
3. **Access programmatically**:

```typescript
import { useFigmaCode } from '@/composables/useFigmaCode'

const { getComponent, getStyle, loadCode } = useFigmaCode()

// Load code
await loadCode(fileKey, apiToken)

// Get component code
const componentCode = getComponent('component-name')

// Get style code
const styleCode = getStyle('style-name')
```

## Example Figma Setup

1. Create a component named "Landing Page Component"
2. Add description:
   ```
   ```vue
   <template>
     <view class="landing-page">
       <!-- Your code here -->
     </view>
   </template>
   ```
   ```
3. Create a frame named "Styles"
4. Add description:
   ```
   ```scss
   .landing-page {
     background: #0F172A;
   }
   ```
   ```

## Troubleshooting

### No Code Found
- Ensure code is in code blocks (```language)
- Check component/frame descriptions
- Verify API token has file access

### Code Not Loading
- Check browser console for errors
- Verify Figma file URL is correct
- Ensure API token is valid

### Code Format Issues
- Use proper code block syntax
- Name components/frames clearly
- Use appropriate language hints

## Next Steps

After loading code:
1. Review extracted components and styles
2. Copy code to your project files
3. Or integrate with auto-apply feature (coming soon)

