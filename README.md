# CLI Task Tracker

Aplikasi sederhana untuk mengelola daftar tugas melalui command line.

## Instalasi

Pastikan Node.js sudah terpasang. Install dependencies dengan:

```
npm install
```

## Cara Penggunaan

Jalankan aplikasi dengan perintah:

```
node command.js <command> [options]
```

## Daftar Perintah

- **add `<task>`**  
  Menambahkan tugas baru.  
  Contoh:  
  ```
  node command.js add "Belajar Node.js"
  ```

- **list `[status]`**  
  Menampilkan semua tugas, atau filter berdasarkan status (`todo`, `in-progress`, `done`).  
  Contoh:  
  ```
  node command.js list
  node command.js list done
  ```

- **update `<id>` `<task>`**  
  Memperbarui deskripsi tugas berdasarkan ID.  
  Contoh:  
  ```
  node command.js update 1 "Belajar Express.js"
  ```

- **delete `<id>`**  
  Menghapus tugas berdasarkan ID.  
  Contoh:  
  ```
  node command.js delete 1
  ```

- **mark-in-progress `<id>`**  
  Mengubah status tugas menjadi `in-progress`.  
  Contoh:  
  ```
  node command.js mark-in-progress 1
  ```

- **mark-done `<id>`**  
  Mengubah status tugas menjadi `done`.  
  Contoh:  
  ```
  node command.js mark-done 1
  ```

## Data Tersimpan

Semua data tugas tersimpan di file `task.json`.

---