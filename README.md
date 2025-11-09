# Nerd Feed

```json
/
├── public/
│ └── favicon.svg
│
├── src
│ ├── application/
│ │ ├── usecases/
│ │ └── auth/
│ │ │ └── AuthService.js
│ │
│ ├── domain/
│ │ ├── entities/
│ │ │ ├── Profile.js
│ │ │ └── User.js
│ │ └── interfaces
│ │ │ ├── ProfileRepositoryInterface.js
│ │ │ └── AuthRepositoryInterface.js
│ │
│ └── infrastructure/
│ │ ├── repositories/ # interaccion con supabase (ej: AuthRepository, ProfileRepository)
│ │ ├── storage/ # LocalStorageUserStore
│ │ └── supabase.js # cliente de supabase
│ │
│ ├── presentation/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── composables/
│ │ ├── pages/
│ │ ├── router/
│ │ ├── App.vue
│ │ └── main.js
│
├── .env
├── index.html
├── package.json
└── ...rest
```
