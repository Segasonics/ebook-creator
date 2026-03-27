# BookForge (eBook Creator)

## Render Build Note (Backend)
Render may install only production dependencies during build. The backend TypeScript compiler requires `typescript` and `@types/*` packages to be present at build time. To avoid `TS2688: Cannot find type definition file for 'node'`, keep these packages in `dependencies` (not `devDependencies`) for the backend.

