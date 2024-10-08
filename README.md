# 08-FEM_interactive-comments-section
## Astro + Panda-Css + TailwindCss + Shadcn + React

### State of project: 🚧 DONE (1st sprint) 🚧

[Live Demo](https://marioa96.github.io/08-FEM_interactive-comments-section/)

## TODO list:

--- 
    //TODO - agregar un loading mientras se cargan los comentarios, con el isLoading de la query
    //TODO - agregar un mensaje de error si no se cargan los comentarios, con el isError de la query
    //TODO - agregar un manejador de estado para conservar la integridad de la query de los comentarios y ratedcomments

    //! De rateApi.ts
    //** Caso inicial 'neutral' cuando hace primer rate o hace el cambio de un rate a neutral LISTO */
    /////TODO Caso 1: Cuando el usuario hace un rate por primera vez o cambia de rate a neutral LISTO
    //TODO Caso 2.1: Cuando el usuario cambia de rate a otro rate en el mismo recurso padre PENDIENTE
    //TODO Caso 3.1: Cuando el usuario cambia de rate a otro rate en un recurso hijo PENDIENTE
    //TODO Caso 4.1: Cuando el usuario cambia de rate a otro rate en un recurso padre y otro recurso hijo PENDIENTE
    //TODO Caso 5.1: Cuando se elimina un comentario padre o hijo este debe eliminar igualmente su rate PENDIENTE
---
    

## The challenge

Your challenge is to build out this interactive comments section and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local `data.json` file, so use that to populate the content on the first load. If you want to take it up a notch, feel free to build this as a full-stack CRUD application!

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

Want some support on the challenge? [Join our community](https://www.frontendmentor.io/community) and ask questions in the **#help** channel.

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
- You can only edit or delete your own comments and replies.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

