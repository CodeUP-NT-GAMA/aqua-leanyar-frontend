
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { theme } from "@/theme/theme";
import { Text, Divider } from 'react-native-paper';
import { useEffect, useState } from 'react';

export default function ProductInfoSection({data, onQuantityUpdate, onColorUpdate, onSizeUpdate } : any) {
  const styles = makeStyles(theme);
  const [selectedSize, setSelectedSize] = useState('M');
  const [colors, setColors] = useState([
    { name: 'Midnight Black', color: '#1a1a1a' },
    { name: 'Ocean Blue', color: '#2563eb' },
    { name: 'Forest Green', color: '#059669' },
    { name: 'Crimson Red', color: '#dc2626' },
    { name: 'Pure White', color: '#ffffff' }
  ]);
  const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL', 'XXL']);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Midnight Black');
  useEffect(() => {
    onQuantityUpdate(quantity);
    onColorUpdate(selectedColor);
    onSizeUpdate(selectedSize);
  }, [quantity, selectedColor, selectedSize]);
   
  const renderColorOption = (colorOption) => {
    const isSelected = selectedColor === colorOption.name;
    return (
      <TouchableOpacity
        key={colorOption.name}
        style={[
          styles.colorOption,
          { backgroundColor: colorOption.color },
          isSelected && styles.colorOptionSelected,
          colorOption.color === '#ffffff' && styles.whiteColorBorder
        ]}
        onPress={() => setSelectedColor(colorOption.name)}
      >
        {isSelected && (
          <View style={[
            styles.colorCheckmark,
            { backgroundColor: colorOption.color === '#ffffff' ? '#000' : '#fff' }
          ]} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
    horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
    <View style={styles.productInfoSection}>
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>${data?.data?.product_price}</Text>
        <Text style={styles.originalPrice}>$89.99</Text>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>25% OFF</Text>
        </View>
      </View>

      <Text style={styles.productTitle}>{data?.data?.product_name}</Text>

      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          <Text style={styles.stars}>★★★★☆</Text>
          <Text style={styles.ratingText}>4.2 (2,847 reviews)</Text>
        </View>
        <Text style={styles.soldCount}>12,450+ sold</Text>
      </View>

      <Text style={styles.productDescription}>
        {data?.data?.product_description || 'This is a great product that you will love! It comes in various sizes and colors, perfect for any occasion.'}
      </Text>

      <Divider style={styles.divider} />

      {/* Size Selection */}
      {/* <View style={styles.optionSection}>
        <Text style={styles.optionTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeOption,
                selectedSize === size && styles.sizeOptionSelected
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[
                styles.sizeText,
                selectedSize === size && styles.sizeTextSelected
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.sizeGuideButton}>
          <Text style={styles.sizeGuideText}>📏 Size Guide</Text>
        </TouchableOpacity>
      </View>

      <Divider style={styles.divider} /> */}

      {/* Color Selection */}
      {/* <View style={styles.optionSection}>
        <Text style={styles.optionTitle}>Color: { }</Text>
        <View style={styles.colorContainer}>
          {colors.map(renderColorOption)}
        </View>
      </View>

      <Divider style={styles.divider} /> */}

      {/* Quantity Selection */}
      <View style={styles.optionSection}>
        <Text style={styles.optionTitle}>Quantity</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(q => Math.max(1, q - 1))}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <View style={styles.quantityDisplay}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(q => q + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.stockText}>12 available</Text>
        </View>
      </View>

      {/* Shipping Info */}
      <View style={styles.shippingSection}>
        <View style={styles.shippingItem}>
          <Text style={styles.shippingIcon}>🚚</Text>
          <Text style={styles.shippingText}>Free shipping on orders over $35</Text>
        </View>
        <View style={styles.shippingItem}>
          <Text style={styles.shippingIcon}>↩️</Text>
          <Text style={styles.shippingText}>30-day returns</Text>
        </View>
        <View style={styles.shippingItem}>
          <Text style={styles.shippingIcon}>🛡️</Text>
          <Text style={styles.shippingText}> Money Back Guarantee</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}
const makeStyles = (theme) => StyleSheet.create({
  productInfoSection: {
    padding: 20,
    backgroundColor:theme.colors.secondaryContainer,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e53e3e',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#6b7280',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  discountText: {
    color: '#92400e',
    fontSize: 12,
    fontWeight: '700',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  soldCount: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    backgroundColor: '#e5e7eb',
    height: 1,
    marginVertical: 20,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  sizeOption: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  sizeOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  sizeTextSelected: {
    color: '#3b82f6',
  },
  sizeGuideButton: {
    alignSelf: 'flex-start',
  },
  sizeGuideText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorOptionSelected: {
    borderColor: '#3b82f6',
    transform: [{ scale: 1.1 }],
  },
  whiteColorBorder: {
    borderColor: '#e5e7eb',
  },
  colorCheckmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },
  quantityDisplay: {
    minWidth: 60,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  stockText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  shippingSection: {
    backgroundColor:  theme.colors.background,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  shippingIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  shippingText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '500',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
},
});