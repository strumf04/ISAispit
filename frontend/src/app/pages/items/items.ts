import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../service/item.service';
import { CategoryService } from '../../service/category.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.html',
  styleUrl: './items.css'
})
export class ItemsComponent implements OnInit {

  items: any[] = [];
  categories: any[] = [];
  isAdmin = false;
  showForm = false;
  isEditing = false;

  selectedItem: any = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };
  selectedCategoryId: number = 0;

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadItems();
    this.loadCategories();
  }

  loadItems(): void {
    this.itemService.getAll().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error(err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  openCreateForm(): void {
    this.selectedItem = { name: '', description: '', price: 0, stock: 0 };
    this.selectedCategoryId = 0;
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(item: any): void {
    this.selectedItem = { ...item };
    this.selectedCategoryId = item.category?.id || 0;
    this.isEditing = true;
    this.showForm = true;
  }

  saveItem(): void {
    if (this.isEditing) {
      this.itemService.update(
        this.selectedItem.id,
        this.selectedItem,
        this.selectedCategoryId
      ).subscribe({
        next: () => {
          this.loadItems();
          this.showForm = false;
        }
      });
    } else {
      this.itemService.create(
        this.selectedItem,
        this.selectedCategoryId
      ).subscribe({
        next: () => {
          this.loadItems();
          this.showForm = false;
        }
      });
    }
  }

  deleteItem(id: number): void {
    if (confirm('Da li ste sigurni?')) {
      this.itemService.delete(id).subscribe({
        next: () => this.loadItems()
      });
    }
  }

  cancel(): void {
    this.showForm = false;
  }
}