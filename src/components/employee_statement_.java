public void handleTierTwoFileUpload(FileUploadEvent event) throws ParseException, SQLException, ClassNotFoundException {
    showOldUpload = false;
    UploadedFile uploadedFile = event.getFile();
    if (uploadedFile == null) {
        return;
    }

    System.out.println("File uploaded is : " + uploadedFile.getFileName());

    if (!(uploadedFile.getFileName().endsWith(".xls") || uploadedFile.getFileName().endsWith(".xlsx"))) {
        System.out.println("Invalid file");
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "File is invalid must be an excel sheet (.xls or .xlsx): ", "Invalid File"));
        return;
    }

    if (employer == null) {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Employer Must be Selected before upload, select empoloyer: ", "Employer Missing"));
        return;
    }

    if (month == null) {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Month is required, please select", "Missing Month"));
        return;
    }

    if (year == null) {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Year is required, please select", "Missing Year"));
        return;
    }

    //check to see if the same month,year,employer and scheme is already approved.
    EntityManager entityManger = session.getEm();
    Query q = entityManger.createQuery("select f from UploadSummary f where f.employer=:empyer and f.month=:mont and f.year=:yr and f.scheme=:sche");
    q.setParameter("empyer", employer).setParameter("mont", month).setParameter("yr", year).setParameter("sche", scheme);
    List<UploadSummary> uploadSummarys = q.getResultList();
    if (!uploadSummarys.isEmpty()) {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "This Employer has an approved Upload Schedule for the selected Month, Year and Scheme", "Duplicate Schedule Found"));

        //return;
    }

    List<TempContribution> temps = session.getAllTemporaryContributions(employer, month, year, scheme);
    List<TempContribution> list = new ArrayList<>();

    for (TempContribution t : temps) {
        if (t.getStatus().equals(ScheduleStatus.NEW)) {
            list.add(t);
        }
    }
    if (!list.isEmpty()) {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Contributions Schedule have already been recorded for the month specified, Reject them before you do an upload of a new Schedule!!", "Duplicate Schedule Found"));
        showUploadDetails = true;
        displayEmployerContribution();
        return;
    }
    try {
        boolean first = true;
        double salarySum = 0.0;
        double employeeSum = 0.0;
        double employerSum = 0.0;
        double employeePostTaxSum = 0.0;
        double employerPostSum = 0.0;
        int totalEmployees = 0;
        int worngEmployeeEmployerMatch = 0;

        Employer newEmployer1 = session.findEmployerById(employer.getId());
        myEmployees = session1.getEmployeesByEmployer(newEmployer1);

        ExcelDataReader excelDataReader = ExcelDataReader.instance(uploadedFile.getInputstream(), uploadedFile.getFileName());
        //Check to ensure that there is enough Money to cover the contribution schedule been uploaded
        System.out.println("================MMMMMMMMMMM The schedulePayment.getAmount() is : " + schedulePayment.getAmount());
        System.out.println("================MMMMMMMMMMM The uploadedValue is : " + uploadedValue);

        int returnValue = fundIsNotSufficient(excelDataReader, schedulePayment.getAmount(), uploadedValue, "Tier2");
        System.out.println("================MMMMMMMMMMM The returned value is : " + returnValue);
        if (returnValue == 0) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("The Excel format wasn't right. Please Check the format well."));
            return;
        } else if (returnValue == 2) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Insufficient Funds to Cover Upload. Upload Rejected"));
            return;
        }
        for (int i = 0; i < excelDataReader.getSheetsSize(); i++) {
            if (excelDataReader.getSheetData(i).size() < 1) {
                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Empty Excel Sheet.", "Data not found"));
                return;
            }
            for (Object[] rec : excelDataReader.getSheetData(i)) {
                if (first) {
                    first = false;
                    continue;
                }
                TempContribution tempContribution = new TempContribution();
                System.out.println("Employer selected is : " + employer.getName());
                Employer newEmployer = session.findEmployerById(employer.getId());
                TrScheme s = session.findBySchemeId(scheme.getSchemeId());
                System.out.println("Scheme is : " + s.getName());
                tempContribution.setSchemeId(s);
                tempContribution.setEmployerId(newEmployer);
                tempContribution.setForYear(year);
                tempContribution.setForMonth(month);
                tempContribution.setUser(username);
                tempContribution.setTaxableOnWithdrawal(taxableOnWithdrawal);
                if (String.valueOf(rec[0]).isEmpty() || String.valueOf(rec[0]) == null) {
                    FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Wrong Excel sheet format, Please conform to the expected excel format", "Inproper Excel sheet format"));
                    return;
                }
                String lastName = "";
                try {
                    lastName = String.valueOf(rec[0]);
                } catch (IndexOutOfBoundsException e) {
                }

                String firstName = "";
                try {
                    firstName = String.valueOf(rec[1]);
                } catch (IndexOutOfBoundsException e) {
                }

                String middleName = "";
                try {
                    middleName = String.valueOf(rec[2]);
                } catch (IndexOutOfBoundsException e) {
                }

                String employeeNumber = "";
                try {
                    employeeNumber = String.valueOf(rec[3]);
                } catch (IndexOutOfBoundsException e) {
                }

                String ssn = "";
                try {
                    ssn = String.valueOf(rec[4]);
                } catch (IndexOutOfBoundsException e) {
                }

                String staffId = "";
                try {
                    staffId = String.valueOf(rec[5]);
                } catch (IndexOutOfBoundsException e) {
                }

                double basicContrib = 0.0;
                String basicSalarys = "";
                try {
                    basicSalarys = String.valueOf(rec[6]);
                } catch (IndexOutOfBoundsException e) {
                }

                if (basicSalarys.equals("")) {
                    FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Please Basic Salary is not provided, please check"));
                    return;
                }
//                    if (!(isNumeric(basicSalarys))) {
//                        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_FATAL, "Value for basic salary must be a number with digits [0-9], please check line number : " + totalEmployees, "Contribution value error"));
//                        tempContribution.setUploadError(true);
//                    } else {
//                       
//                    }
                 basicContrib = Double.valueOf(basicSalarys);
                 
                tempContribution.setEmployeeNumber(employeeNumber);

                tempContribution.setSocialSecurityNumber(ssn);

                //search for employee with the base number.
                Employee em;
                try {
                    EntityManager emgr = session.getEm();
                    Query query = emgr.createQuery("select f from EmployeeSchemes f where f.accountNumber=:accNum");
                    query.setParameter("accNum", employeeNumber);
                    List<EmployeeSchemes> empList = query.getResultList();
                    em = empList.get(0).getEmployeeId();
                } catch (Exception e) {
                    em = null;
                }

                //Employee em = session.findByEmployeeNumber(employeeNumber);
                if (em == null) {
                    tempContribution.setFound("No");
                    tempContribution.setWarn("New Employee");
                    tempContribution.setUploadError(true);
                } else {
                    Double nameCompareRate = calculateSimilarity((lastName + " " + firstName + " " + middleName), (em.getSurname() + " " + em.getFirstName() + " " + em.getOtherNames()));
                    if (nameCompareRate < acceptableNamePercentage) {
                        //do nothing
                        //tempContribution.setUploadError(true);
                    }
                    String xx = "";
                    if (!ssn.equals(em.getSocialSecurityNumber())) {
                        xx = " ;SSN not Match";
                    }
                    if (!staffId.equals(em.getStaffId())) {
                        xx = xx + " ;StaffID not Match";
                    }

                    tempContribution.setEmployeeId(em);
                    tempContribution.setFound("Yes");
                    tempContribution.setWarn("Ok " + "Name was " + df.format(nameCompareRate) + "%" + xx);

                    if (myEmployees.contains(em)) {
                        myEmployees.remove(em);
                    }
                }
                if (checkLength(ssn)) {
                    System.out.println("SSN lenght is valid");
                } else {
                    System.out.println("Invalid SSN Lenght specified!!");
                }
                totalEmployees++;
                double employeeContrib = 0.0;
                String employeeMoney = "";
                try {
                    employeeMoney = String.valueOf(rec[7]);
                } catch (IndexOutOfBoundsException e) {
                }
                if (employeeMoney.equals("")) {
                    FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("Please employee 5% contribution is not provided, please recheck the file and try again.. "));
                    return;
                }
                // if (!(isNumeric(employeeMoney))) {
                //     FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_FATAL, "Value for emloyee contribution must be a number with digits [0-9], please check line number : " + totalEmployees, "Contribution value error"));
                //     tempContribution.setUploadError(true);
                // } else {
                  
                // }
                employeeContrib = Double.valueOf(employeeMoney);
                String staffUpdate = "";
                try {
                    staffUpdate = String.valueOf(rec[8]);
                } catch (IndexOutOfBoundsException e) {
                }

                if (!staffUpdate.equals("")) {
                    if (staffCodePresent(staffUpdate)) {
                        StaffUpdateCode code = StaffUpdateCode.valueOf(staffUpdate.toUpperCase());
                        if (code.equals(StaffUpdateCode.NC)) {
                            if (em != null) {
                                em.setSurname(lastName);
                                em.setFirstName(firstName);
                                em.setOtherNames(middleName);
                                crudService.save(em);
                            }
                        } else if (code.equals(StaffUpdateCode.RS)) {
                            if (em != null) {
                                em.setExitedDate(new Date());
                                crudService.save(em);
                            }
                        }
                    }
                }

                String effectiveDate = "";
                try {
                    effectiveDate = String.valueOf(rec[9]);
                } catch (IndexOutOfBoundsException e) {
                }
//                    Date contributionDate = new Date();
//                    if (!effectiveDate.equals("")) {
//                        if (!isValidFormat(effectiveDate)) {
//                            System.out.println("Effective Date format Error");
//                            //FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Invalid date Specified for Effective Date, if is a single number make sure there is a zero infront of it", "Invalid Date Format"));
//                        } else {
//                            contributionDate = FORMATTER.parse(effectiveDate);
//                        }
//                    }
                double total = 0.0 + employeeContrib + 0.0 + 0.0;

                System.out.println("All Totals is :  " + total);
                double unitPrice = 1.0;
//                    EmployerSchemess ems = session1.getSchemeAndEmployerScheme(s, newEmployer);
//                    if (ems != null) {
//                        if (ems.getShareClass() != null) {
//                            SchemeShareClass shareClass = ems.getShareClass();
//                            unitPrice = shareClass.getUnitPrice();
//                        } else {
//                        }
//                    }
                if (schedulePayment.getUnitPrice() == null || schedulePayment.getUnitPrice() == 0.0) {
                    unitPrice = returnUnitPrice(s, schedulePayment);
                } else {
                    unitPrice = schedulePayment.getUnitPrice();
                }
                //this is for Enterprise because initially their Employer payments had init price of 1.0 
                if (unitPrice == 1 || unitPrice == 1.0) {
                    unitPrice = s.getUnitPrice();
                }

                double unitsQcuired = employeeContrib / unitPrice;

                salarySum += basicContrib;
                employeeSum += employeeContrib;
                employerSum += 0.0;
                employeePostTaxSum += 0.0;
                employerPostSum += 0.0;

                tempContribution.setEmployerContribution(0.0);
                tempContribution.setEmployeeContribution(employeeContrib);
                tempContribution.setEmployeePostTaxContribution(0.0);
                tempContribution.setEmployerPostTaxContribution(0.0);
                tempContribution.setTotalContribution(total);
                tempContribution.setBasicSalary(basicContrib);
                tempContribution.setUnitPrice(unitPrice);
                tempContribution.setUnitsAcquired(unitsQcuired);
                if (em != null) {
                    if (!(em.getEmployerId().equals(newEmployer))) {
                        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Employees Data to be uploaded does not match this employer, please verify before and try again", "Employer and Employee mismatch"));
                        tempContribution.setWarn("Employee-Employer Mismatch");
                        tempContribution.setUploadError(true);
                    } else {
                        //double rate = newEmployer.getEmployeeContributionRate();
                        double contrib = 0.05 * basicContrib;
                        if (contrib == employeeContrib) {
                            System.out.println("Calculation is ok");
                        } else {
                            //tempContribution.setWarn("Percentage Contribution Error");
                            //tempContribution.setUploadError(true);
                        }
                        try{
                            if (em.getSocialSecurityNumber().equals(ssn)) {
                                System.out.println("SSN Valid");
                            } else {
                                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("SSN Mismatch, ssn given in schedule is different from the one in employee data"));
                            
                                tempContribution.setUploadError(true);
                                tempContribution.setWarn("Different SNN Number found");
                            }
                        }catch(Exception e){
                            e.printStackTrace();
                            tempContribution.setUploadError(true);
                            tempContribution.setWarn("Different SNN Number found");
                            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("SSN Mismatch, ssn given in schedule is different from the one in employee data"));
                            
                        }
                    }
                }
                tempContribution.setContributionDate(schedulePayment.getValueDate());
                tempContribution.setContributionType(contributionType);
                //if(tracking != null){
                tempContribution.setTrackingSchedules(tracking);
                //}
                tempContribution.setSchedulePayment(schedulePayment);
                tempContribution.setEmployeeSchemes(session2.returnEmployeeScheme(employeeNumber));

                if (session.createObjects(tempContribution)) {

                    System.out.println(totalEmployees + "." + "Saved Contribution of Type : " + tempContribution.getContributionType().getName());
                }
            }
            if (tracking != null) {
                int trID = tracking.getId() != null ? tracking.getId() : 0;
                if (trID != 0) {
                    tracking = session.getEm().find(TrackingSchedules.class, trID);
                    tracking.setStatus("Uploaded");
                    tracking.setStatusDate(new Date());
                    session.updateObjects(tracking);
                }
            }
        }
        //get employee not found in upload schedule
        employeeNotInSchudule();

        System.out.println("Data Uploaded and Saved Successfully");
//            UploadSummary summary = new UploadSummary();
//            Employer newEmployer = session.findEmployerById(employer.getId());
//            summary.setEmployer(newEmployer);
//            summary.setBasicSalarySum(salarySum);
//            summary.setEmployeeContribSum(employeeSum);
//            summary.setEmployerContribSum(employerSum);
//            summary.setEmployeePostTaxContribSum(employeePostTaxSum);
//            summary.setEmployerPostTaxContribSum(employerPostSum);
//            summary.setTotalEmployees(totalEmployees);
//            summary.setMonth(month);
//            summary.setYear(year);
//            summary.setStatus(ScheduleStatus.NEW);
//            summary.setUser(username);
//            if (session.createObjects(summary)) {
//                FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN, "Sucess: Total Employees is : " + totalEmployees + " and Total Basic Salary is : " + salarySum + " Check the previous Upload table below......", "Upload Summary"));
//            }
        init();
        showUploadDetails = true;
        uploaded = true;
        displayEmployerContribution();
        refreshPage();
        if (worngEmployeeEmployerMatch > 0) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN, worngEmployeeEmployerMatch + " Employees exist in the system but does not match the employer selected please check it,", "Employee Employer Mismatch"));
        }

        runBalance();

    } catch (IOException | NumberFormatException e) {
        e.printStackTrace();
        System.out.println("Error Occured here: " + e.getLocalizedMessage());
    }
}
