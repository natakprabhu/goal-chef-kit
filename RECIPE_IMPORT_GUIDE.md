# Recipe Import Guide

This guide explains how to bulk import recipes into the nutrition app using CSV or JSON files.

## Accessing the Import Feature

1. Navigate to `/doremon` (Admin Panel)
2. Click on the "Recipes" tab
3. Use the "Import from CSV/JSON" button to upload your file
4. Download sample templates to see the correct format

## Supported File Formats

### CSV Format
- Maximum file size: 20MB
- Encoding: UTF-8
- Use pipe (|) separator for array items in ingredients and instructions

### JSON Format
- Maximum file size: 20MB
- Must be valid JSON
- Can be single object or array of objects

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| title | String | Recipe name (max 200 chars) | "Paneer Tikka Masala" |
| description | String | Brief description (max 500 chars) | "Spicy cottage cheese in tomato gravy" |
| meal_type | Enum | breakfast, lunch, dinner, snack, snack2 | "lunch" |
| diet_type | Enum | veg or non_veg | "veg" |
| calories | Number | Total calories (must be positive) | 320 |
| protein | Number | Protein in grams (must be positive) | 18 |
| carbs | Number | Carbohydrates in grams (must be positive) | 25 |
| fats | Number | Fats in grams (must be positive) | 12 |

## Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| fiber | Number | Fiber in grams | 5 |
| difficulty | String | Easy, Medium, or Hard | "Medium" |
| prep_time | Number | Preparation time in minutes | 15 |
| cook_time | Number | Cooking time in minutes | 30 |
| access_level | Enum | guest, logged_in, subscribed | "guest" |
| goal_category | Enum | weight_gain, weight_loss, maintenance | "maintenance" |
| tags | Array | Array of tag strings | ["high protein", "indian"] |
| ingredients | Array | Array of ingredient strings | ["200 gm paneer", "2 cups water"] |
| instructions | Array | Array of instruction strings | ["Heat oil", "Add spices"] |
| image_url | String | Valid URL to recipe image | "https://example.com/image.jpg" |

## CSV Format Example

```csv
title,description,meal_type,diet_type,calories,protein,carbs,fats,fiber,difficulty,prep_time,cook_time,access_level,goal_category,tags,ingredients,instructions,image_url
"Paneer Tikka","Grilled cottage cheese",lunch,veg,280,18,12,16,3,Medium,15,20,guest,maintenance,"high protein|indian","200 gm paneer|2 tbsp yogurt|1 tbsp spices","Marinate for 30 min|Grill until golden|Serve hot",https://example.com/paneer.jpg
```

**Important CSV Notes:**
- Wrap text fields containing commas in double quotes
- Use pipe (|) to separate multiple items in arrays
- Arrays: tags, ingredients, instructions
- Don't use line breaks within cells

## JSON Format Example

```json
[
  {
    "title": "Paneer Tikka",
    "description": "Grilled cottage cheese marinated in spices",
    "meal_type": "lunch",
    "diet_type": "veg",
    "calories": 280,
    "protein": 18,
    "carbs": 12,
    "fats": 16,
    "fiber": 3,
    "difficulty": "Medium",
    "prep_time": 15,
    "cook_time": 20,
    "access_level": "guest",
    "goal_category": "maintenance",
    "tags": ["high protein", "indian"],
    "ingredients": [
      "200 gm paneer, cubed",
      "2 tablespoon yogurt",
      "1 tablespoon ginger-garlic paste",
      "1 teaspoon garam masala"
    ],
    "instructions": [
      "Marinate paneer with yogurt and spices for 30 minutes",
      "Thread onto skewers",
      "Grill for 15-20 minutes until golden",
      "Serve hot with chutney"
    ],
    "image_url": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
  }
]
```

## Import Process

1. **File Validation**: System checks file format and size
2. **Data Parsing**: Reads CSV or JSON content
3. **Data Normalization**: Converts string numbers to actual numbers, parses arrays
4. **Schema Validation**: Validates each recipe against schema rules
5. **Duplicate Check**: Compares titles with existing recipes in database
6. **Insertion**: Adds only new, valid recipes to database

## What Happens During Import

- ✅ Valid recipes are inserted into the database
- ⏭️ Duplicate recipes (by title) are automatically skipped
- ❌ Invalid recipes trigger validation errors and are skipped
- 📊 Summary shows: imported count, duplicates skipped, validation errors

## Common Validation Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Title is required" | Missing or empty title | Provide recipe title |
| "Calories must be positive" | Negative or zero value | Use positive numbers |
| "Invalid meal_type" | Wrong enum value | Use: breakfast, lunch, dinner, snack, snack2 |
| "Invalid diet_type" | Wrong enum value | Use: veg or non_veg |
| "Row X: Invalid data format" | Malformed data | Check JSON syntax or CSV structure |

## Best Practices

1. **Start Small**: Test with 2-3 recipes first
2. **Use Templates**: Download and modify sample templates
3. **Validate Locally**: Check your JSON/CSV before uploading
4. **Check Duplicates**: Review existing recipes to avoid duplicates
5. **Proper Encoding**: Save CSV files as UTF-8
6. **Image URLs**: Use valid, publicly accessible image URLs
7. **Indian Nomenclature**: Use kg, gm, ml, tablespoon for measurements
8. **Detailed Instructions**: Include step-by-step cooking instructions

## Tips for Bulk Imports

- **CSV is better for**: Simple recipes, spreadsheet editing, compatibility
- **JSON is better for**: Complex instructions, nested data, programmatic generation
- Maximum 10,000 recipes per import recommended
- Large files may take 30-60 seconds to process
- The system automatically removes duplicates by title

## Troubleshooting

### "No recipes found in file"
- File is empty or has only headers
- Check if data rows exist

### "Unsupported file format"
- Only .csv and .json extensions are supported
- Check file extension

### "Failed to import recipes"
- Check browser console for detailed errors
- Verify all required fields are present
- Ensure data types match requirements

### "All recipes already exist"
- Recipes with same titles already in database
- Change recipe titles or delete existing ones first

## Need Help?

- Download sample templates from the admin panel
- Check existing recipes for reference
- Review validation error messages in console
- Contact support if issues persist
