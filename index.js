import inquirer from 'inquirer';
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // method to enroll
    enroll_course(course) {
        this.courses.push(course);
    }
    //  method to view student balance
    view_balance() {
        console.log(`Balance for ${this.name}:${this.balance}`);
    }
    // method to pay student tuition fee
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fee paid successfully for ${this.name}`);
    }
    // method to display student status
    show_status() {
        console.log(`ID:${this.id}`);
        console.log(`name:${this.name}`);
        console.log(`course:${this.courses}`);
        console.log(`balance:${this.balance}`);
    }
}
//  Defining a student management class to define students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`student: ${name} added successfully. Student ID: ${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} erolled in ${course} successfully`);
        }
    }
    // method to view student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student not found, please enter a correct student ID`);
        }
    }
    // method to find student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    // method to pay student fee
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not fount, please enter a correct student id");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
}
// main function to run the program
async function main() {
    console.log(`welcome to 'drop of change'- student management system`);
    console.log("-".repeat(60));
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "view student balance",
                    "pay fees",
                    "show status",
                    "exit"
                ]
            }
        ]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter student id"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name"
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "view student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id"
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "pay fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fee_input.student_id, fee_input.amount);
                break;
            case "show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "exit":
                console.log("Exiting....");
                process.exit();
        }
    }
}
// calling main function
main();
