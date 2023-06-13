import { NotesStatus } from './../constants/noteStatus';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from '../user/user.entity';

@Entity()
class Notes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ enum: NotesStatus, default: NotesStatus.UNDONE })
    status: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}

export default Notes