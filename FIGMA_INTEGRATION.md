# Figma Integration Guide

This project includes a complete Figma integration system that allows you to sync design tokens and styles directly from your Figma designs.

## Setup

### 1. Get Your Figma API Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to "Personal access tokens"
3. Click "Create new token"
4. Copy the token (you'll only see it once!)

### 2. Get Your Figma File Key

1. Open your Figma file
2. Look at the URL: `https://www.figma.com/file/FILE_KEY/File-Name`
3. Copy the `FILE_KEY` part

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIGMA_API_TOKEN=your_figma_api_token_here
VITE_FIGMA_FILE_KEY=your_figma_file_key_here
```

**Note:** Never commit your `.env` file to version control. Add it to `.gitignore`.

## Usage

### Automatic Sync

The page automatically syncs from Figma on mount if environment variables are set. No additional code needed!

### Manual Sync

You can also manually sync from any component:

```vue
<script setup lang="ts">
import { useFigma } from '@/composables/useFigma'

const { tokens, sync, isLoading, error } = useFigma()

const handleSync = async () => {
  await sync({
    apiToken: 'your_token',
    fileKey: 'your_file_key'
  })
}
</script>
```

### Using Design Tokens

Design tokens are automatically available in your SCSS files:

```scss
@import '@/styles/designTokens.scss';

.my-component {
  background: $color-background;
  color: $color-text-primary;
  padding: $spacing-md;
  border-radius: $radius-lg;
}
```

## How It Works

1. **Figma Service** (`src/utils/figma.ts`)
   - Connects to Figma API
   - Fetches file data and design tokens
   - Extracts colors, spacing, typography, and other design properties

2. **Design Tokens** (`src/utils/designTokens.ts`)
   - Manages design token structure
   - Converts Figma styles to application tokens
   - Provides default fallback tokens

3. **Figma Sync** (`src/utils/figmaSync.ts`)
   - Orchestrates the sync process
   - Handles errors and logging
   - Updates application tokens

4. **Vue Composable** (`src/composables/useFigma.ts`)
   - Provides reactive Figma integration
   - Easy to use in Vue components
   - Handles loading and error states

## Design Token Structure

The system extracts and manages:

- **Colors**: Background, text, accent, action colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography**: Font sizes and weights
- **Radius**: Border radius values
- **Effects**: Glass morphism, glows, shadows

## Figma Best Practices

For best results when syncing from Figma:

1. **Use Variables**: Create Figma Variables for colors and spacing
2. **Name Consistently**: Use clear, consistent naming (e.g., `background`, `text-primary`)
3. **Organize Styles**: Group related styles together
4. **Use Components**: Create reusable components in Figma

## Troubleshooting

### Sync Not Working?

1. Check your API token is valid
2. Verify the file key is correct
3. Ensure you have access to the Figma file
4. Check browser console for errors

### Tokens Not Updating?

- Design tokens are cached. Restart the dev server after syncing
- Check that Figma file has been saved recently
- Verify token names match expected patterns

## API Reference

### `figmaService.getFile()`
Fetches the entire Figma file structure.

### `figmaService.extractDesignTokens()`
Extracts design tokens from the Figma file.

### `figmaService.getNode(nodeId)`
Fetches a specific node by ID.

### `figmaService.getImages(nodeIds, format, scale)`
Exports images from Figma nodes.

## Example: Syncing Specific Components

```typescript
import { figmaService } from '@/utils/figma'

// Get specific component
const component = await figmaService.getNode('node-id-here')

// Export images
const images = await figmaService.getImages(['node-id-1', 'node-id-2'], 'png', 2)
```

## Next Steps

- Set up your Figma file with design tokens
- Configure environment variables
- Run the app and watch tokens sync automatically!
- Customize the token extraction logic in `figma.ts` to match your Figma structure

