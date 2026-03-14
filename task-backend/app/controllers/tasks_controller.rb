class TasksController < ApplicationController
  def index
    tasks = Task.order_by(created_at: :desc)

    render json: {
      message: "Tasks fetched successfully",
      data: tasks.map { |task| task_payload(task) }
    }, status: :ok
  end

  def create
    task = Task.new(task_params)

    if task.save
      render json: {
        message: "Task created successfully",
        data: task_payload(task)
      }, status: :created
    else
      render json: {
        message: "Task could not be created",
        errors: task.errors.to_hash(true)
      }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :status)
  end

  def task_payload(task)
    {
      id: task.id.to_s,
      title: task.title,
      description: task.description,
      status: task.status,
      created_at: task.created_at,
      updated_at: task.updated_at
    }
  end
end
