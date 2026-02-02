# Frontend Integration Master Prompt - Backend v3 Features

**Target**: Integrate backend library v3 features into frontend-library  
**Backend Version**: v3 (with categories system)  
**Priority**: High - Breaking Changes Require Frontend Updates

---

## 🎯 Objektif Utama

Mengintegrasikan fitur baru dari backend-library (schema v3) ke frontend-library:

1. **Categories Management** - CRUD untuk kategori buku
2. **Auto-Generated Book IDs** - Book IDs tidak lagi manual input
3. **Books API Updates** - Field `category` → `category_code` + `category_name`
4. **Enhanced Book Display** - Tampilkan nama kategori, bukan code

---

## 🔄 Breaking Changes dari Backend

### 1. Books API Response Structure

**BEFORE (v2)**:
```typescript
interface Book {
  id: string;              // Manual: "BK001"
  title: string;
  category: string;        // Plain string: "Informatika"
  author: string;
  publisher: string;
  year: number;
  total_copies: number;
  available_copies: number;
  loaned_copies: number;
}
```

**AFTER (v3)**:
```typescript
interface Book {
  id: string;              // Auto: "INF001", "TI002"
  title: string;
  category_code: string;   // FK: "INF", "TI", "MAN"
  category_name?: string;  // Display: "Informatika"
  author: string;
  publisher: string;
  year: number;
  total_copies: number;
  available_copies: number;
  loaned_copies: number;
}
```

### 2. Create Book API

**BEFORE (v2)**:
```typescript
POST /api/books
{
  "id": "BK001",           // ❌ Manual input
  "title": "...",
  "category": "Informatika", // ❌ Plain string
  "author": "...",
  "publisher": "...",
  "year": 2024,
  "stock": 3
}
```

**AFTER (v3)**:
```typescript
POST /api/books
{
  // ✅ NO "id" field - auto-generated!
  "title": "...",
  "category_code": "INF",  // ✅ Category code
  "author": "...",
  "publisher": "...",
  "year": 2024,
  "stock": 3
}

// Response: { id: "INF001", ... }
```

### 3. New Categories API

**Endpoints**:
```
GET    /api/categories           # List all (with book counts)
GET    /api/categories/:code     # Get detail
POST   /api/categories           # Create (admin only)
PUT    /api/categories/:code     # Update (admin only)
DELETE /api/categories/:code     # Delete (admin only)
```

**Response**:
```typescript
interface Category {
  code: string;           // "INF", "TI", "MAN"
  name: string;           // "Informatika"
  description?: string;   // "Buku-buku tentang..."
  book_count: number;     // Jumlah buku kategori ini
  created_at?: string;
  updated_at?: string;
}
```

---

## 📋 Scope Pekerjaan Frontend

### Phase 1: API Types & Services

#### 1.1 Update Book Types
**File**: `src/types/book.ts` atau `src/models/book.ts`

```typescript
// Update interface
export interface Book {
  id: string;
  title: string;
  category_code: string;   // CHANGED
  category_name?: string;  // NEW
  author: string;
  publisher: string;
  year: number;
  total_copies?: number;
  available_copies?: number;
  loaned_copies?: number;
}

export interface CreateBookDTO {
  // Remove: id field
  title: string;
  category_code: string;   // CHANGED
  author: string;
  publisher: string;
  year: number;
  stock: number;
}
```

#### 1.2 Create Category Types
**File**: `src/types/category.ts` (NEW)

```typescript
export interface Category {
  code: string;
  name: string;
  description?: string;
  book_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryDTO {
  code: string;
  name: string;
  description?: string;
}
```

#### 1.3 Update Book Service
**File**: `src/services/bookService.ts`

```typescript
// Update createBook - remove id parameter
export const createBook = async (data: CreateBookDTO) => {
  // Remove id from payload
  const response = await api.post('/api/books', {
    title: data.title,
    category_code: data.category_code,  // CHANGED
    author: data.author,
    publisher: data.publisher,
    year: data.year,
    stock: data.stock
  });
  return response.data;
};
```

#### 1.4 Create Category Service
**File**: `src/services/categoryService.ts` (NEW)

```typescript
export const categoryService = {
  getAll: () => api.get<Category[]>('/api/categories'),
  getByCode: (code: string) => api.get<Category>(`/api/categories/${code}`),
  create: (data: CreateCategoryDTO) => api.post('/api/categories', data),
  update: (code: string, data: Partial<CreateCategoryDTO>) => 
    api.put(`/api/categories/${code}`, data),
  delete: (code: string) => api.delete(`/api/categories/${code}`)
};
```

---

### Phase 2: UI Components Updates

#### 2.1 Books List/Table
**File**: `src/features/books/components/BooksTable.tsx`

**Changes**:
```tsx
// BEFORE:
<TableCell>{book.category}</TableCell>

// AFTER:
<TableCell>{book.category_name || book.category_code}</TableCell>
```

#### 2.2 Book Form - Add Book
**File**: `src/features/books/components/BookFormModal.tsx`

**Major Changes**:

1. **Remove ID Input Field**:
```tsx
// ❌ DELETE THIS:
<Input
  label="Book ID"
  name="id"
  required
/>
```

2. **Replace Category Text Input → Dropdown**:
```tsx
// ❌ DELETE THIS:
<Input
  label="Category"
  name="category"
/>

// ✅ ADD THIS:
<Select
  label="Category"
  name="category_code"
  required
>
  {categories.map(cat => (
    <option key={cat.code} value={cat.code}>
      {cat.name}
    </option>
  ))}
</Select>
```

3. **Fetch Categories on Mount**:
```tsx
const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  categoryService.getAll()
    .then(res => setCategories(res.data))
    .catch(err => console.error(err));
}, []);
```

---

### Phase 3: New Categories Management Page (Admin Only)

#### 3.1 Categories List
**File**: `src/features/categories/components/CategoriesPage.tsx` (NEW)

**Features**:
- Table dengan columns: Code, Name, Description, Book Count, Actions
- Filter/Search by name or code
- Create button (modal)
- Edit/Delete actions (admin only)

#### 3.2 Category Form
**File**: `src/features/categories/components/CategoryFormModal.tsx` (NEW)

**Fields**:
- Code (text, uppercase, 2-10 chars, disabled on edit)
- Name (text, required)
- Description (textarea, optional)

**Validation**:
- Code: /^[A-Z0-9]{2,10}$/
- Unique code check

---

### Phase 4: Navigation & Routing

#### 4.1 Add Categories Route
**File**: `src/App.tsx`

```tsx
<Route path="/categories" element={<CategoriesPage />} />
```

#### 4.2 Update Sidebar
**File**: `src/components/layout/Sidebar.tsx`

```tsx
// Add menu item (admin only)
{user?.role === 'admin' && (
  <SidebarLink
    icon={<CategoryIcon />}
    label="Categories"
    path="/categories"
  />
)}
```

---

## 🧪 Testing Checklist

### Books Module
- [ ] List books shows `category_name` instead of `category`
- [ ] Create book: ID field removed, category dropdown works
- [ ] Create book: Book ID auto-generated correctly (INF001, TI002, etc)
- [ ] Book detail: Category name displayed properly

### Categories Module
- [ ] List categories with book counts
- [ ] Create category with validation
- [ ] Edit category (code cannot be changed)
- [ ] Delete category: blocked if books exist

---

## ⚠️ Important Notes

### Default Categories
Backend sudah install 8 kategori default:
- INF (Informatika)
- TI (Teknik Industri)
- MAN (Manajemen)
- EKO (Ekonomi)
- MTK (Matematika)
- FIS (Fisika)
- KIM (Kimia)
- UMU (Umum)

### Book ID Pattern
Format baru: `{CATEGORY_CODE}{XXX}`
- INF001, INF002, INF003
- TI001, TI002
- MAN001

---

## 📊 Implementation Priority

| Priority | Task | Time |
|----------|------|------|
| 🔴 Critical | Update Book types & service | 30 min |
| 🔴 Critical | Update Book form | 1 hour |
| 🔴 Critical | Update Book display | 30 min |
| 🟡 High | Create Category service | 30 min |
| 🟡 High | Create Categories page | 2 hours |

**Total**: ~5 hours

---

## 📁 Files to Create/Modify

### New Files
- `src/types/category.ts`
- `src/services/categoryService.ts`
- `src/features/categories/components/CategoriesPage.tsx`
- `src/features/categories/components/CategoryFormModal.tsx`

### Modified Files
- `src/types/book.ts` - Update interface
- `src/services/bookService.ts` - Remove id from create
- `src/features/books/components/BookFormModal.tsx` - Remove ID, add dropdown
- `src/features/books/components/BooksTable.tsx` - Display category_name
- `src/App.tsx` - Add categories route
- `src/components/layout/Sidebar.tsx` - Add menu item

---

**Ready to implement?** Follow phases sequentially for smooth integration.
