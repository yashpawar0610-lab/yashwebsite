import Report from '../models/Report.js';
import Activity from '../models/Activity.js';

// @desc    Get all reports with filtering, searching, & pagination
// @route   GET /api/reports
export const getReports = async (req, res) => {
  try {
    const { category, status, search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Report.countDocuments(query);
    const reports = await Report.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: reports.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      reports
    });
  } catch (error) {
    console.error('[Get Reports Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
};

// @desc    Create a new report
// @route   POST /api/reports
export const createReport = async (req, res) => {
  try {
    const { title, category, status, summary, metrics, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Report title is required'
      });
    }

    const report = await Report.create({
      title,
      category: category || 'Operational',
      status: status || 'Completed',
      summary: summary || 'Automated synthesis report generated via Pulse Core Analytics Engine.',
      metrics: metrics || {
        efficiency: '97.4%',
        throughput: '1,450 req/s',
        anomalyRate: '0.02%'
      },
      tags: tags || ['Q4-Analytics', 'Automated'],
      generatedBy: req.user ? req.user._id : null,
      authorName: req.user ? req.user.name : 'System Agent'
    });

    // Record activity
    await Activity.create({
      user: req.user ? req.user._id : null,
      userName: req.user ? req.user.name : 'System Agent',
      action: 'Generated Report',
      details: `Created "${report.title}" in [${report.category}]`,
      type: 'success'
    });

    return res.status(201).json({
      success: true,
      report
    });
  } catch (error) {
    console.error('[Create Report Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create report'
    });
  }
};

// @desc    Get single report by ID
// @route   GET /api/reports/:id
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    return res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to find report'
    });
  }
};

// @desc    Update a report
// @route   PUT /api/reports/:id
export const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    await Activity.create({
      user: req.user ? req.user._id : null,
      userName: req.user ? req.user.name : 'System Agent',
      action: 'Updated Report',
      details: `Modified status of "${report.title}" to ${report.status}`,
      type: 'info'
    });

    return res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update report'
    });
  }
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    await Activity.create({
      user: req.user ? req.user._id : null,
      userName: req.user ? req.user.name : 'System Agent',
      action: 'Deleted Report',
      details: `Removed report "${report.title}"`,
      type: 'danger'
    });

    return res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete report'
    });
  }
};

// @desc    Export report data
// @route   GET /api/reports/:id/export
export const exportReport = async (req, res) => {
  try {
    const { format = 'json' } = req.query;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    report.downloads += 1;
    await report.save();

    if (format === 'csv') {
      const csvHeader = 'ID,Title,Category,Status,Author,Downloads,CreatedAt\n';
      const csvRow = `"${report._id}","${report.title}","${report.category}","${report.status}","${report.authorName}",${report.downloads},"${report.createdAt}"\n`;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=report-${report._id}.csv`);
      return res.send(csvHeader + csvRow);
    }

    return res.status(200).json({
      success: true,
      exportData: {
        id: report._id,
        title: report.title,
        category: report.category,
        status: report.status,
        summary: report.summary,
        metrics: report.metrics,
        tags: report.tags,
        author: report.authorName,
        downloads: report.downloads,
        createdAt: report.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to export report'
    });
  }
};
