import express from 'express';
import { PrismaClient } from ".prisma/client";
import TeamApplication from "app/application/team/TeamApplication";
import TeamRepository from "infra/repository/TeamRepository";
import PairRepository from 'infra/repository/PairRepository';
import UserRepository from 'infra/repository/UserRepository';
import TeamCreateCommand from "app/application/team/TeamCreateCommand"

// チーム一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const teamRepository = new TeamRepository(prisma);
        const pairRepository = new PairRepository(prisma);
        const userRepository = new UserRepository(prisma);
        const teamApplication = new TeamApplication(teamRepository, pairRepository, userRepository);
        const teamAll = await teamApplication.findTeamAll();
        res.set({
            'content-type': 'application/json',
        });
        return res.status(200).json(teamAll);
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

// チーム更新
exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const teamRepository = new TeamRepository(prisma);
        const pairRepository = new PairRepository(prisma);
        const userRepository = new UserRepository(prisma);
        const teamApplication = new TeamApplication(teamRepository, pairRepository, userRepository);

        await teamApplication.update(new TeamCreateCommand(req));
        res.set({
            'content-type': 'text/plain',
        });
        return res.status(201).send('Update success');
    } catch (e) {
        return res.status(400).send(e.message);
    }
}