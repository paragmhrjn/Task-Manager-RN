import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server"
// function get tasks
export const getTasks = query({
    handler: async (ctx) => {
        const tasks = await ctx.db.query("tasks").order("desc").collect();
        return tasks
    }
})
// function to add new tasks
export const addTask = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const taskId = await ctx.db.insert("tasks", {

            text: args.text,
            isCompleted: false
        })
        return taskId
    }
})

// function to toggle selection of task
export const toggleTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        // to fetch tasks
        const task = await ctx.db.get(args.id)
        if (!task) throw new ConvexError("Task not Found")

        await ctx.db.patch(args.id, {
            isCompleted: !task.isCompleted
        })
    }
})

// function to delete task

export const deleteTask = mutation({
    args: { id: v.id("tasks") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

// function to update task
export const updateTask = mutation({
    args: {
        id: v.id("tasks"),
        text: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text,
        })
    }
})

//  function to delete all task

export const clearAllTasks = mutation({
    handler: async (ctx) => {
        const tasks = await ctx.db.query("tasks").collect();

        // delete all tasks
        for (const task of tasks) {
            await ctx.db.delete(task._id)
        }
        return { deletedCount: tasks.length }
    }
})