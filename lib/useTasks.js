"use client";

import { useState, useEffect, useCallback } from "react";
import { filterTasks, sortTasks } from "@/lib/helpers";

function loadFromStorage(key, fallback) {
    if (typeof window === "undefined") return fallback;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortOption, setSortOption] = useState("createdAt");
    const [searchQuery, setSearchQuery] = useState("");
    const [hydrated, setHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        setTasks(loadFromStorage("flowtask_tasks", []));
        setCategories(loadFromStorage("flowtask_categories", []));
        setHydrated(true);
    }, []);

    // Persist tasks
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem("flowtask_tasks", JSON.stringify(tasks));
        }
    }, [tasks, hydrated]);

    // Persist categories
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem("flowtask_categories", JSON.stringify(categories));
        }
    }, [categories, hydrated]);

    const addTask = useCallback((task) => {
        setTasks((prev) => [task, ...prev]);
    }, []);

    const toggleComplete = useCallback((id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addCategory = useCallback((category) => {
        setCategories((prev) => [...prev, category]);
    }, []);

    const deleteCategory = useCallback((id) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
    }, []);

    function handleFilterChange(key, value) {
        if (key === "statusFilter") setStatusFilter(value);
        if (key === "priorityFilter") setPriorityFilter(value);
        if (key === "sortOption") setSortOption(value);
    }

    // Apply search, filter, sort
    const filtered = filterTasks(tasks, statusFilter, priorityFilter);
    const searched = searchQuery
        ? filtered.filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : filtered;
    const visibleTasks = sortTasks(searched, sortOption);

    return {
        tasks,
        categories,
        visibleTasks,
        statusFilter,
        priorityFilter,
        sortOption,
        searchQuery,
        setSearchQuery,
        addTask,
        toggleComplete,
        deleteTask,
        addCategory,
        deleteCategory,
        handleFilterChange,
    };
}
