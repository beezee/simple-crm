import { AppDataSource } from "./data-source"
import { User, UserUpdateCodec } from "./entity/User"
import { Note, NoteCreateCodec } from "./entity/Note"
import * as express from "express"
import { withBody } from "./middleware/with-body"

const run = async () => {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());

    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager
            .getRepository(User)
            .find({
                relations: ['notes'],
                order: {
                    id: 'ASC',
                    notes: {
                        createdAt: 'DESC'
                    }
                }
            });
        res.json(users);
    });

    app.get("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['notes'],
                order: {
                    notes: {
                        createdAt: 'DESC'
                    }
                }
            });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    });

    app.post("/users",
        withBody(UserUpdateCodec)(async (req, res) => {
            const repository = AppDataSource.manager.getRepository(User);
            const user = repository.create(req.body);
            await repository.save(user);
            res.json(user);
        })
    );

    app.put("/users/:id",
        withBody(UserUpdateCodec)(async (req, res) => {
            const repository = AppDataSource.manager.getRepository(User);
            const result = await repository.update(req.params.id, req.body);
            
            if (result.affected === 0) {
                return res.status(404).json({ error: "User not found" });
            }
            
            const user = await repository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['notes'],
                order: {
                    notes: {
                        createdAt: 'DESC'
                    }
                }
            });
            res.json(user);
        })
    );

    app.post("/users/:id/notes",
        withBody(NoteCreateCodec)(async (req, res) => {
            // First check if user exists
            const userRepository = AppDataSource.manager.getRepository(User);
            const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Create and save the note
            const noteRepository = AppDataSource.manager.getRepository(Note);
            const note = noteRepository.create({
                content: req.body.content,
                userId: user.id,
                createdAt: new Date()
            });
            await noteRepository.save(note);

            // Return the updated user with all notes
            const updatedUser = await userRepository.findOne({
                where: { id: user.id },
                relations: ['notes'],
                order: {
                    notes: {
                        createdAt: 'DESC'
                    }
                }
            });
            res.json(updatedUser);
        })
    );

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};

run();
