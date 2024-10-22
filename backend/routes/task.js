const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("./auth");

// Create task
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers; // Extract user ID from headers

    // Create a new task
    const newTask = new Task({ title: title, desc: desc });
    const savedTask = await newTask.save();
    
    // Update the user's tasks array by pushing the new task's ID
    await User.findByIdAndUpdate(id, { $push: { tasks: savedTask._id } });

    res.status(200).json({ message: "Task created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get all tasks
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    // Find user and populate tasks
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } }, // Sort tasks by creation date
    });

    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Delete task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const userId = req.headers.id; // User ID from headers

    // Delete the task
    await Task.findByIdAndDelete(id);

    // Remove the task reference from the user's tasks array
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});
  //UPDATE TASK
  router.put("/update-task/:id",authenticateToken, async (req, res) => {
    try {
      const { id } = req.params; // Task ID
      const {title,desc}=req.body;
      await Task.findOneAndUpdate(id,{title:title,desc:desc});
      
      res.status(200).json({ message: "Task updated  successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
});
//Update-important task

router.put("/update-imp-task/:id",authenticateToken, async (req, res) => {
    try {
      const { id } = req.params; // Task ID
      const TaskData =await Task.findById(id);
      const Imptask =TaskData.important;
      await Task.findOneAndUpdate(id,{important:Imptask});
      
      res.status(200).json({ message: "Task updated  successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
});

//update complete task


router.put("/update-complete-task/:id",authenticateToken, async (req, res) => {
    try {
      const { id } = req.params; // Task ID
      const TaskData =await Task.findById(id);
      const Completetask =TaskData.important;
      await Task.findOneAndUpdate(id,{complete: !Completetask});
      
      res.status(200).json({ message: "Task updated  successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
});
// GET IMPORTANT TASK
router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Find user and populate tasks
      const Data = await User.findById(id).populate({
        path: "tasks",
       match:{complete:true},
       options:{sort :{createdAt: -1}},
      });
      const ImpTaskData= Data.tasks;
  
      res.status(200).json({ data: ImpTaskData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });



// Complete Task
router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Find user and populate tasks
      const Data = await User.findById(id).populate({
        path: "tasks",
       match:{complete:true},
       options:{sort :{createdAt: -1}},
      });
      const completeTaskData= Data.tasks;
  
      res.status(200).json({ data: completeTaskData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error",});
    }
  });

  // Incompleted task
  router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
  
      // Find user and populate tasks
      const Data = await User.findById(id).populate({
        path: "tasks",
       match:{complete:false},
       options:{sort :{createdAt: -1}},
      });
      const completeTaskData= Data.tasks;
  
      res.status(200).json({ data: completeTaskData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error",});
    }
  });




module.exports = router;
