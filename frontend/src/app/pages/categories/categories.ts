import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];
  isAdmin = false;
  showForm = false;
  isEditing = false;

  selectedCategory: any = { name: '', description: '' };

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  openCreateForm(): void {
    this.selectedCategory = { name: '', description: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(category: any): void {
    this.selectedCategory = { ...category };
    this.isEditing = true;
    this.showForm = true;
  }

  saveCategory(): void {
    if (this.isEditing) {
      this.categoryService.update(this.selectedCategory.id, this.selectedCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.showForm = false;
        }
      });
    } else {
      this.categoryService.create(this.selectedCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.showForm = false;
        }
      });
    }
  }

  deleteCategory(id: number): void {
    if (confirm('Da li ste sigurni?')) {
      this.categoryService.delete(id).subscribe({
        next: () => this.loadCategories()
      });
    }
  }

  cancel(): void {
    this.showForm = false;
  }
}
